import imaplib
import smtplib
import socket
from .serializers import UserSerializer, CreateUserSerializer, LogoutUserSerializer
from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny


server = None
mail = None

def smtp_imap_login(email_address, password):
    global server, mail
    
    try:
        host_smtp = "smtp.gmail.com"
        host_imap = "imap.gmail.com"
        
        server = smtplib.SMTP(host=host_smtp, port=587)
        server.ehlo()
        server.starttls()
        server.login(user=email_address, password=password)

        mail = imaplib.IMAP4_SSL(host=host_imap)
        mail.login(user=email_address, password=password)
        
        return server, mail

    except smtplib.SMTPAuthenticationError as e:
        raise smtplib.SMTPAuthenticationError(
            msg="Email address and password combination provided is invalid.", code=500
        )
    except smtplib.SMTPConnectError as e:
        raise smtplib.SMTPConnectError(
            "The connection with the server failed."
        )
    except smtplib.SMTPException as e:
        raise smtplib.SMTPException("Base Error.")
    except imaplib.IMAP4.error as e:
        raise imaplib.IMAP4.error("An IMAP4 operation error.")
    except (socket.gaierror, ConnectionError, TimeoutError) as e:
        raise ConnectionError("Unable to establish a stable internet connection. Please check your network connection and try again.") from e


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        username = request.data["username"]
        user = User.objects.filter(username=username)
        
        if user:
            return Response({"message": "User with this username already exists", "exists": True}, status=status.HTTP_201_CREATED)
        
        return super().post(request, *args, **kwargs)
    

class LoginUserView(APIView):
    if any([server, mail]):
        server.quit()
        mail.logout()
        
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            try:
                server, mail = smtp_imap_login(email, password)
                return Response(
                    {"message": "Login successful"}, status=status.HTTP_200_OK
                )

            except (smtplib.SMTPAuthenticationError, imaplib.IMAP4.error) as e:
                return Response(
                    {
                        "message": "Email address and password combination provided is invalid.",
                        "error_code": "002"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except (smtplib.SMTPConnectError, smtplib.SMTPException) as e:
                return Response(
                    {
                        "message": "The connection with the server failed."
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            except (socket.gaierror, ConnectionError, TimeoutError) as e:
                return Response(
                    {"message": "Unable to establish a stable internet connection. Please check your network connection and try again."},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )


class HomePageView(APIView):
    serializer_class = ""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        pass
    
    def post(self, request, *args, **kwargs):
        pass


class LogoutUserView(APIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            logout = serializer.validated_data["logout"]
            if logout:
                server.quit()
                mail.logout()
                return Response({"message": "User successfully logged out."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "An error occurred during logout."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
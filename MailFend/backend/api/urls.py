from django.urls import path, include
from .views import LoginUserView, CreateUserView, LogoutUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("login/", LoginUserView.as_view(), name="login-user"),
    path("create-user/", CreateUserView.as_view(), name="create-user"),
    path("logout/", LogoutUserView.as_view(), name="logout-user"),
    path("token/", TokenObtainPairView.as_view(), name="get-token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
]

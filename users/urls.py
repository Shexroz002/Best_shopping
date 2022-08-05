from django.urls import path
from .views import RegisterView,LoginView,LoginRegisterView,UpdateProfileView,ProfileupdateView,LogoutView

app_name="users"
urlpatterns = [
    path('login', LoginRegisterView.as_view(),name='login'),
    path('logout', LogoutView.as_view(),name='logout'),
    path('update/profile', UpdateProfileView.as_view(),name='update'),
    path('api/update/profile', ProfileupdateView.as_view(),name='apiupdate'),
    path('api/login',LoginView.as_view(),name='login'),
    path('api/register',RegisterView.as_view(),name='register')
]
from django.urls import path
from .views import (
     RegisterView,
     LoginView,
     LoginRegisterView,
     UpdataProfileView,
     ProfileupdataView,
     LogoutView,
     ChatMessage,
     ChatView,
     WriteClientMassage,
     ChatUserbyAdminView
)

app_name="users"
urlpatterns = [
    path('login', LoginRegisterView.as_view(),name='loginuser'),
    path('logout', LogoutView.as_view(),name='logout'),
    path('chat', ChatView.as_view(),name='chatlola'),
    path('chat/<int:id>', ChatUserbyAdminView.as_view(),name='chatuserbyadmin'),
    path('update/profile', UpdataProfileView.as_view(),name='update'),
    path('api/update/profile/<int:pk>', ProfileupdataView.as_view(),name='apiupdate'),
    path('api/login',LoginView.as_view(),name='login'),
    path('api/register',RegisterView.as_view(),name='register'),
    path('api/chat/<int:id>',ChatMessage.as_view(),name='chat'),
    path('api/chat/user',WriteClientMassage.as_view(),name='client'),

]
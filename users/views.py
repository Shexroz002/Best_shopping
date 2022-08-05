from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render,redirect
from rest_framework import permissions
from rest_framework import views
from django.views import View
from rest_framework.response import Response
from django.contrib.auth import login, logout
from . import serializers
from .models import Client
from rest_framework import status
from django.shortcuts import get_object_or_404

class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response({"login":True}, status=status.HTTP_202_ACCEPTED)

class RegisterView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print('salom')
        print(request.data)
        serializer = serializers.RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"register":201},status=status.HTTP_201_CREATED)
        else:
            return Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)


class ProfileupdateView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        user = get_object_or_404(Client,id = request.user.id)
        serializer = serializers.ClientSerializer(user)
        return Response(serializer.data)
    
    def put(self, request):
        user = get_object_or_404(Client,id = request.user.id)
        fields = ['username', 'photo','email']
        serializer = serializers.ClientSerializer(instance = user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginRegisterView(View):
    def get(self,request):
        return render(request, 'login.html')

class UpdateProfileView(View):
    def get(self,request):
        return render(request, 'updateprofile.html')

class LogoutView(LoginRequiredMixin,View):
    def get(self,request):
        print('foydalanuvchi saytdan chiqdi')
        logout(request)

        return  redirect('products:feed')
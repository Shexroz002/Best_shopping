
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import response
from django.shortcuts import render,redirect
from rest_framework import permissions
from rest_framework import views
from django.views import View
from rest_framework.response import Response
from django.contrib.auth import login, logout
from . import serializers
from .models import Client,ChatModel
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
        return Response({"login":True,"is_superuser":user.is_superuser,"username":user.username}, status=status.HTTP_202_ACCEPTED)

class RegisterView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = serializers.RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"register":201},status=status.HTTP_201_CREATED)
        else:
            return Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)

class ProfileupdataView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request,pk):
        user = get_object_or_404(Client,id = pk)
        serializer = serializers.ClientSerializer(user)
        return Response(serializer.data)
    
    def put(self, request,pk):
        user = get_object_or_404(Client, pk=pk)
        serializer = serializers.UserCreateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializers.UserCreateSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error":serializer.errors},status=status.HTTP_400_BAD_REQUEST)

class LoginRegisterView(View):
    def get(self,request):
        return render(request, 'login.html')

class ChatView(View):
    def get(self,request):
        user =  get_object_or_404(Client,id=6) 
        return render(request,'chatuser.html',{"user":user})

class ChatUserbyAdminView(View):
    def get(self,request,id):
        readby = get_object_or_404(Client,id=id)
        writeby = request.user
        print(writeby.username,readby.username,'L',id)
        new1=ChatModel.objects.filter(write_chat=writeby,read_chat = readby ).order_by('-data')
        new2=ChatModel.objects.filter(write_chat=readby,read_chat = writeby ).order_by('-data')
        cos=list(new1)+list(new2)
        for i in cos:
            for j in cos:
                if i.data < j.data:
                    i.write_chat, j.write_chat = j.write_chat, i.write_chat
                    i.read_chat, j.read_chat = j.read_chat, i.read_chat
                    i.data, j.data = j.data, i.data
                    i.message, j.message = j.message, i.message
        print(cos)
        return render(request,'chat.html',{"user":readby,"messages":cos})



class UpdataProfileView(View):
    def get(self,request):
        return render(request, 'updateprofile.html')

class LogoutView(LoginRequiredMixin,View):
    def get(self,request):
        print('foydalanuvchi saytdan chiqdi')
        logout(request)

        return  redirect('products:feed')


class ChatMessage(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request,id):
        readby = get_object_or_404(Client,id=id)
        writeby = request.user

        new1=ChatModel.objects.filter(write_chat=writeby,read_chat = readby ).order_by('-data')
        new2=ChatModel.objects.filter(write_chat=readby,read_chat = writeby ).order_by('-data')
        cos=list(new1)+list(new2)
        for i in cos:
            for j in cos:
                if i.data < j.data:
                    i.write_chat, j.write_chat = j.write_chat, i.write_chat
                    i.read_chat, j.read_chat = j.read_chat, i.read_chat
                    i.data, j.data = j.data, i.data
                    i.message, j.message = j.message, i.message
        return Response(serializers.ChatModelSerializer(cos,many=True).data,status=status.HTTP_200_OK)
    
    def post(self,request,id):

        readby = get_object_or_404(Client,id=id)
        writeby =  request.user
        print(readby,writeby)
        message = serializers.ChatSerializer(data=request.data)
        if message.is_valid():
            if writeby.chat_status:
                message.save(write_chat =writeby,read_chat = readby )
                print(message)
                return Response(message.data,status=status.HTTP_201_CREATED)
            else:
                writeby.chat_status = True
                writeby.save()
                message.save(write_chat =writeby,read_chat = readby )
                print(message.data)
                return Response(message.data,status=status.HTTP_201_CREATED)
        else:
            return Response({"error":message.errors})




class WriteClientMassage(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request):
        clients = Client.objects.filter(chat_status=True,is_superuser=False)
        return Response(serializers.ClientChatSerializer(clients,many=True).data,status=status.HTTP_200_OK)

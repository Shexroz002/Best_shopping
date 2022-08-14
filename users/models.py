from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Client(AbstractUser):
    photo = models.ImageField(null=True,blank=True,upload_to='user_image/',default='user_image/userimage.jpg')
    chat_status = models.BooleanField(default=False)
    def __str__(self):
        return self.username

class ChatModel(models.Model):
    write_chat = models.ForeignKey(Client,on_delete=models.DO_NOTHING,verbose_name="Client user",related_name="client")
    read_chat = models.ForeignKey(Client,on_delete=models.DO_NOTHING,verbose_name="Manager user",related_name="admin")
    message = models.CharField(max_length=500,default='')
    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.write_chat.username
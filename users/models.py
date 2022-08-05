from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Client(AbstractUser):
    photo = models.ImageField(null=True,blank=True,upload_to='user_image/',default='user_image/userimage.jpg')
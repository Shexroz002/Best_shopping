
from django.db import models
from users.models import Client
# Create your models here.

class Products(models.Model):
    product_name = models.CharField(max_length=150,default='not found this product',verbose_name="Mahsulot nomi")
    product_price = models.FloatField(default=0,verbose_name="Mahsulot narxi")
    product_image = models.ImageField(upload_to='product_image/',default='product_image/productnew.jpg',verbose_name="Mahsulot rasmi")
    product_skidka_price = models.FloatField(default=0,verbose_name="Mahsulotning skidka narxi")
    product_type = models.CharField(max_length = 100,default='')
    product_description = models.CharField(max_length=1000,default='This product')

    def __str__(self):
        return self.product_name


class Bannner(models.Model):
    banner_describtion = models.CharField(max_length=250,default='not found this product',verbose_name="Banner haqida ma'limot")
    banner_title = models.CharField(max_length=150,default='not found this banner',verbose_name="Banner title")
    banner_image = models.ImageField(upload_to='banner_image/',default='product_image/bannernew.jpg',verbose_name="Banner rasmi")
    banner_skidka_price =models.CharField(max_length=50,default='not found this banner',verbose_name="Banner chegirma")

    def __str__(self):
        return self.banner_title


class CellProduct(models.Model):
    customer = models.ForeignKey(Client,on_delete=models.DO_NOTHING,verbose_name='Haridor')
    product = models.ForeignKey(Products,on_delete=models.DO_NOTHING,verbose_name='Sotilgan Mahsulot')
    product_count = models.IntegerField(default=1,verbose_name="Mahsulot soni")
    total_price = models.FloatField(default=0,verbose_name="Umumiy narxi")
    data_time = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)
    def __str__(self):
        return self.product.product_name


class CustomerPurchas(models.Model):
    product = models.ManyToManyField(CellProduct,verbose_name='Olingan Mahsulotlar')
    customer = models.ForeignKey(Client,on_delete=models.DO_NOTHING,verbose_name='Haridor')
    total_price = models.FloatField(default=0,verbose_name="Umumiy narxi")
    data_time = models.DateTimeField(auto_now_add=True,verbose_name='Sotib olingan vaqt')
    product_status = models.BooleanField(default=False)

    def __str__(self):
        return self.customer.username

class ShoppingHistory(models.Model):
    customer = models.ForeignKey(Client,on_delete=models.DO_NOTHING,verbose_name='Haridor')
    product = models.ManyToManyField(CustomerPurchas,verbose_name='Xaridalar Royhati')
    data_time = models.DateTimeField(auto_now_add=True,verbose_name='Sotib olingan vaqt')
    def __str__(self):
        return self.customer.username
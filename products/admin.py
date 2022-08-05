from django.contrib import admin
from .models import Products,Bannner,CustomerPurchas,CellProduct,ShoppingHistory
# Register your models here.
admin.site.register(Products)
admin.site.register(Bannner)
admin.site.register(CustomerPurchas)
admin.site.register(CellProduct)
admin.site.register(ShoppingHistory)
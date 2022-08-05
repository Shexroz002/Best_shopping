
from rest_framework import serializers
from .models import Products,Bannner,CellProduct,CustomerPurchas, ShoppingHistory

class ProductSerializer(serializers.ModelSerializer):
     class Meta:
        model = Products
        fields = "__all__"

class BannnerSerializer(serializers.ModelSerializer):
     class Meta:
        model = Bannner
        fields = "__all__"
class CellProductSerializer(serializers.ModelSerializer):
      product = ProductSerializer()
      class Meta:
        model = CellProduct
        fields = "__all__"

class CustomerPurchasSerializer(serializers.ModelSerializer):
      product = CellProductSerializer(many=True)
      class Meta:
        model = CustomerPurchas
        fields = ["id","product","total_price","data_time"]

class ShoppingHistorySerializer(serializers.ModelSerializer):
      product = CustomerPurchasSerializer(many=True)
      class Meta:
        model = ShoppingHistory
        fields = "__all__"
from django.shortcuts import get_object_or_404
from users.models import Client
from django.shortcuts import render
from django.views import View
from rest_framework import views
from rest_framework import response
from rest_framework import status
from .serializers import (
     ProductSerializer,
     BannnerSerializer,
     CellProductSerializer,
     CustomerPurchasSerializer,
     ShoppingHistorySerializer
)
from .models import CellProduct, Products,Bannner,CustomerPurchas,ShoppingHistory
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator
import json
from django.http import HttpResponse

from django.template.loader import get_template

from xhtml2pdf import  pisa
# Create your views here.
class FeedView(View):
    def get(self,request):
        return render(request, 'feed.html')
class ShoppingHistoryView(View):
    def get(self,request):
        return render(request, 'shoppinghistory.html')

class ProductsView(View):
    def get(self,request):
        return render(request, 'products.html')

class ProductDetailView(View):
    def get(self,request,id):
        product = get_object_or_404(Products,id=id)
        return render(request, 'productDetails.html',{"product":product})


class CartView(View):
    def get(self,request):
        return render(request, 'cart.html')

class ProductAPIView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        products = Products.objects.all()[:8]
        return response.Response(ProductSerializer(products,many=True).data,status=status.HTTP_200_OK)


class CardShopAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request):
        celproduct = get_object_or_404(CustomerPurchas,customer = request.user,product_status = False)
        count_poduct = celproduct.product.count()
        return response.Response({"count":count_poduct},status=status.HTTP_200_OK)


class ProductdetailAPIView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        products = Products.objects.all().order_by('-product_price')[:4]
        return response.Response(ProductSerializer(products,many=True).data,status=status.HTTP_200_OK)

class CellProductAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request):
        cell_products = CellProduct.objects.all()
        return response.Response(CellProductSerializer(cell_products,many=True).data,status=status.HTTP_200_OK)

class ShoppingHistoryAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request):
        purchas_products = ShoppingHistory.objects.filter(customer = request.user)
        return response.Response(ShoppingHistorySerializer(purchas_products,many=True).data,status=status.HTTP_200_OK)



def pdf_report_create(request,id):
    products = CustomerPurchas.objects.get(id=id)
    template_path = 'pdfReport.html'

    context = {'products': products.product.all(),"subtitilr":products.total_price,'time':products.data_time}

    response = HttpResponse(content_type='application/pdf')

    response['Content-Disposition'] = f'filename="{products.customer.username}.pdf"'

    template = get_template(template_path)

    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
    html, dest=response)
    # if error then show some funy view
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response
    return response.Response(ShoppingHistorySerializer(purchas_products).data,status=status.HTTP_200_OK)

class CustomerPurchasAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request):
        purchas_products = CustomerPurchas.objects.filter(customer = request.user,product_status = False).last()
        return response.Response(CustomerPurchasSerializer(purchas_products).data,status=status.HTTP_200_OK)
    
    def put(self,request):
        if CustomerPurchas.objects.filter(customer = request.user,product_status = False).exists():
            imas = CustomerPurchas.objects.filter(customer = request.user,product_status = False).last()
            product_id = request.data.get('product_id').split(',')
            product_count = request.data.get('product_count').split(',')
            print(imas,imas.id)
            all_summ = 0
            for i in range(0,len(product_id)-2):
                product_cell =CellProduct.objects.get(product__id = int(product_id[i]),status=False)
                product_cell.product_count = int(product_count[i])
                all_summ += int(product_count[i])*product_cell.product.product_price
                product_cell.total_price = int(product_count[i])*product_cell.product.product_price
    
                product_cell.status = True
                product_cell.save()
            imas.total_price = all_summ
            imas.product_status = True
            imas.save()
            shop_history = ShoppingHistory.objects.create(customer = request.user)
            shop_history.product.add(imas)
            shop_history.save()
            return response.Response({'status':True,"id":imas.id},status=status.HTTP_200_OK)
        else:
            return response.Response({'status':False},status=status.HTTP_404_NOT_FOUND)

class BannnerAPIView(views.APIView):
    def get(self,request):
        benner = Bannner.objects.all()[:8]
        return response.Response(BannnerSerializer(benner,many=True).data,status=status.HTTP_200_OK)

class CellProductAddAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request,id):
        product = get_object_or_404(Products,id = id)
        if CustomerPurchas.objects.filter(customer = request.user,product_status=False).exists():
            custoer = CustomerPurchas.objects.filter(customer = request.user,product_status=False).last()
            print(custoer.id,'id')
            if CellProduct.objects.filter(customer = request.user,product = product,status = False).exists():
                newproduct = CellProduct.objects.get(customer = request.user,product = product,status = False)
                products = custoer.product.all()
                if newproduct in products:
                    print("elementelement bor")
                    return response.Response({"status_add":False,"product":"bor"},status=status.HTTP_201_CREATED)
                else:
                    print("element yoq")
                    custoer.product.add(newproduct)
                    return response.Response({"status_add":True},status=status.HTTP_201_CREATED)
            else :
                newproduct = CellProduct.objects.create(customer = request.user,product = product)
                products = custoer.product.all()
                print(products,products)
                if newproduct in products:
                    return response.Response({"status_add":False,"product":"bor"},status=status.HTTP_201_CREATED)
                else:
                    custoer.product.add(newproduct)
                    return response.Response({"status_add":True},status=status.HTTP_201_CREATED)
    
        else:
            custoer = CustomerPurchas.objects.create(customer = request.user)
            if CellProduct.objects.filter(customer = request.user,product = product).exists():
                newproduct = CellProduct.objects.get(customer = request.user,product = product)
                products = custoer.product.all()
                print(newproduct,products)
                if newproduct in products:
                    return response.Response({"status_add":False,"product":"bor"},status=status.HTTP_201_CREATED)
                else:
                    custoer.product.add(newproduct)
                    return response.Response({"status_add":True},status=status.HTTP_201_CREATED)
            else :
                newproduct = CellProduct.objects.create(customer = request.user,product = product)
                products = custoer.product.all()
                print(newproduct,products)
                if newproduct in products:
                    return response.Response({"status_add":False,"product":"bor"},status=status.HTTP_201_CREATED)
                else:
                    custoer.product.add(newproduct)
                    return response.Response({"status_add":True},status=status.HTTP_201_CREATED)


class CustomerPurchasRemoveProductAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request,id):
        product_remove = get_object_or_404(CellProduct,product__id = id,customer = request.user,status=False)
        customer_purchas = get_object_or_404(CustomerPurchas,customer = request.user,product_status=False)
        products = customer_purchas.product.all()
        if  product_remove in products:
            customer_purchas.product.remove(product_remove)
            return response.Response({"status_remove":True},status=status.HTTP_201_CREATED)
        else:
            return response.Response({"status_remove":False},status=status.HTTP_404_NOT_FOUND)

class ProductDetailAPIView(views.APIView):
    def get(self,request,id):
        product = get_object_or_404(Products,id=id)
        return response.Response(ProductSerializer(product).data,status=status.HTTP_200_OK)

class ProductAllAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def get(self,request):
        category = request.query_params.get('category')
        sorts = request.query_params.get('sortby')
        if sorts == 'name':
            sorts = 'product_name'
        if sorts == 'price':
            sorts = 'product_price'
        print(sorts)
        products = Products.objects.all()
        print(category,sorts)
        if category is not None:
            if category !='all':
                products = products.filter(product_type = category)
        if sorts is not None and sorts != "Name":
            if sorts !='no_sort':
                products = products.order_by(f'{sorts}')

        return response.Response(ProductSerializer(products,many=True).data,status=status.HTTP_200_OK)


class SearchProducAPIView(views.APIView):
    def get(self,request):
        search = request.query_params.get('search')
        product = Products.objects.filter(product_name__istartswith = search)
        return response.Response(ProductSerializer(product,many=True).data,status=status.HTTP_200_OK)
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 1000


class FooList(views.APIView):

    page_size = 10

    def get(self, request):
        foo = Products.objects.all()
        paginator = StandardResultsSetPagination()
        paginator.page_size = 12
        result_page = paginator.paginate_queryset(foo, request)
        serializer = ProductSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
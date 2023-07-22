# upload_price/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('calculate-price/', views.calculate_price, name='calculate-price'),
    path('create-config/', views.create_config, name='create-config'),
    path('get-config/', views.get_price_config, name='get-config'),
    path('set-live/', views.set_live, name='set-live'),
]

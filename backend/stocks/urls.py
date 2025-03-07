from django.urls import path
from .views import StocksView, StockDetailView

urlpatterns = [
    path('stocks/', StocksView.as_view(), name='stocks'),   # List all stocks and create new one
    path('stocks/<int:stock_id>/', StockDetailView.as_view(), name='stock-detail'),  # CRUD operations on individual stocks
]

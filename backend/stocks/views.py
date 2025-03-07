from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Stock
from .serializers import StockSerializer

class StocksView(APIView):

    # GET: Retrieve all stock data
    def get(self, request):
        stocks = Stock.objects.all()
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data)

    # POST: Create a new stock entry
    def post(self, request):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StockDetailView(APIView):
    
    # Helper function to get a stock instance
    def get_object(self, stock_id):
        try:
            return Stock.objects.get(id=stock_id)
        except Stock.DoesNotExist:
            return None

    # GET: Retrieve a single stock item
    def get(self, request, stock_id):
        stock = self.get_object(stock_id)
        if stock:
            serializer = StockSerializer(stock)
            return Response(serializer.data)
        return Response({'error': 'Stock not found'}, status=status.HTTP_404_NOT_FOUND)

    # PUT: Update an existing stock item
    def put(self, request, stock_id):
        stock = self.get_object(stock_id)
        if stock:
            serializer = StockSerializer(stock, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Stock not found'}, status=status.HTTP_404_NOT_FOUND)

    # DELETE: Remove a stock item
    def delete(self, request, stock_id):
        stock = self.get_object(stock_id)
        if stock:
            stock.delete()
            return Response({'message': 'Stock deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Stock not found'}, status=status.HTTP_404_NOT_FOUND)

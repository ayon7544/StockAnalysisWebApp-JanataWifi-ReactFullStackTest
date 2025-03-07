import json
from stocks.models import Stock

with open('C:/Users/arpag/OneDrive/Desktop/StockAnalysisWebApp-JanataWifi-ReactFullStackTest/backend/stocks/stock_market_data.json', 'r') as file:
    data = json.load(file)


for stock in data:
    Stock.objects.create(
        date=stock['date'],
        trade_code=stock['trade_code'],
        high=float(stock['high']),
        low=float(stock['low']),
        open_price=float(stock['open']),
        close=float(stock['close']),
        volume=int(stock['volume'].replace(",", ""))  # Remove commas from volume
    )

print("Data loaded successfully!")

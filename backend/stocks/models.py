from django.db import models

class Stock(models.Model):
    date = models.DateField()
    trade_code = models.CharField(max_length=50)
    high = models.FloatField()
    low = models.FloatField()
    open_price = models.FloatField()
    close = models.FloatField()
    volume = models.BigIntegerField()

    def __str__(self):
        return f"{self.trade_code} - {self.date}"

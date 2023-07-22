from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(TimeMultiplierFactor)
admin.site.register(PriceWithBreakPoint)
admin.site.register(DayBasedPricing)
admin.site.register(PriceConfig)

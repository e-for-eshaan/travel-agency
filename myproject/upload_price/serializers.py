# serializers.py

from rest_framework import serializers
from .models import *


class TimeMultiplierFactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeMultiplierFactor
        fields = '__all__'


class PriceWithBreakPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceWithBreakPoint
        fields = '__all__'


class DayBasedPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayBasedPricing
        fields = '__all__'


class PriceConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceConfig
        fields = '__all__'

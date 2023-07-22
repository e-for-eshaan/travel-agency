# upload_price/views.py
from upload_price.models import PriceConfig
from .serializers import PriceConfigSerializer
from django.http import JsonResponse
from rest_framework import status
from .serializers import *
from .models import PriceConfig
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import datetime
from .models import *

days_of_week = ["Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday", "Sunday"]


# Calculate the price for the trip
@csrf_exempt
@api_view(['POST'])
def calculate_price(request):
    try:
        distance = request.data["Dn"]
        distance = float(distance)
        time = request.data["Tn"]
        time = float(time)
        waiting_time = request.data["waiting_time"]
        waiting_time = float(waiting_time)

        current_datetime = datetime.datetime.now()

        current_day = current_datetime.strftime('%A')

        # get the live config
        price_config = PriceConfig.objects.filter(IsLive=True).first()
        serializer = PriceConfigSerializer(price_config)
        data = serializer.data

        DBP = data["DBP"]
        dbp = get_object_or_404(DayBasedPricing, id=DBP)
        data["DBP"] = DayBasedPricingSerializer(dbp).data

        days = []
        for i in days_of_week:
            day = get_object_or_404(
                PriceWithBreakPoint, id=data["DBP"][i])
            days.append({"day": i, **PriceWithBreakPointSerializer(day).data})

        data["DBP"] = days
        DAP = data["DAP"]
        dap = get_object_or_404(PriceWithBreakPoint, id=DAP)
        data["DAP"] = PriceWithBreakPointSerializer(dap).data

        TMF = data["TMF"]
        tmf = get_object_or_404(TimeMultiplierFactor, id=TMF)
        data["TMF"] = TimeMultiplierFactorSerializer(tmf).data

        WC = data["WC"]
        wc = get_object_or_404(PriceWithBreakPoint, id=WC)
        data["WC"] = PriceWithBreakPointSerializer(wc).data

        # Day Base Price
        day_base_price = 0
        for i in data["DBP"]:
            if(i["day"] == current_day):
                day_base_price = i["preBreakPointPrice"]
                break

        # Distance Applied Price
        distance_applied_price = data["DAP"]["preBreakPointPrice"] if (
            distance <= data["DAP"]["breakPoint"]) else data["DAP"]["postBreakPointPrice"]

        # Waiting Charge
        waiting_charge = data["WC"]["preBreakPointPrice"] if (
            waiting_time <= data["WC"]["breakPoint"]) else data["WC"]["postBreakPointPrice"]

        # Time Multiplier Factor
        time_multiplier_factor = 0
        if (time <= data["TMF"]["breakPoint1"]):
            time_multiplier_factor = data["TMF"]["preBreakPointPrice"]
        elif(time > data["TMF"]["breakPoint1"] and time <= data["TMF"]["breakPoint2"]):
            time_multiplier_factor = data["TMF"]["midBreakPointPrice"]
        else:
            time_multiplier_factor = data["TMF"]["endBreakPointPrice"]

        Price = (day_base_price + (distance * distance_applied_price)
                 ) + (time * time_multiplier_factor) + waiting_charge

        price_data = {
            "Price": Price
        }

        return JsonResponse(price_data, status=200)

    except Exception as e:
        return JsonResponse({"status": "failed", "error": str(e)}, status=500)


# Create the config for the same
@csrf_exempt
@api_view(['POST'])
def create_config(request):
    try:

        day_based_pricing = DayBasedPricing.objects.create(
            Monday=PriceWithBreakPoint.objects.create(
                breakPoint=request.data["DBP"]["Monday"]["breakPoint"],
                preBreakPointPrice=request.data["DBP"]["Monday"]["preBreakPointPrice"],
                postBreakPointPrice=request.data["DBP"]["Monday"]["postBreakPointPrice"]),

            Tuesday=PriceWithBreakPoint.objects.create(
                breakPoint=request.data["DBP"]["Tuesday"]["breakPoint"],
                preBreakPointPrice=request.data["DBP"]["Tuesday"]["preBreakPointPrice"],
                postBreakPointPrice=request.data["DBP"]["Tuesday"]["postBreakPointPrice"]),
            Wednesday=PriceWithBreakPoint.objects.create(
                breakPoint=request.data["DBP"]["Wednesday"]["breakPoint"],
                preBreakPointPrice=request.data["DBP"]["Wednesday"]["preBreakPointPrice"],
                postBreakPointPrice=request.data["DBP"]["Wednesday"]["postBreakPointPrice"]),

            Thursday=PriceWithBreakPoint.objects.create(
                breakPoint=request.data["DBP"]["Thursday"]["breakPoint"],
                preBreakPointPrice=request.data["DBP"]["Thursday"]["preBreakPointPrice"],
                postBreakPointPrice=request.data["DBP"]["Thursday"]["postBreakPointPrice"]),

            Friday=PriceWithBreakPoint.objects.create(
                breakPoint=request.data["DBP"]["Friday"]["breakPoint"],
                preBreakPointPrice=request.data["DBP"]["Friday"]["preBreakPointPrice"],
                postBreakPointPrice=request.data["DBP"]["Friday"]["postBreakPointPrice"]),

            Saturday=PriceWithBreakPoint.objects.create(
                breakPoint=request.data["DBP"]["Saturday"]["breakPoint"],
                preBreakPointPrice=request.data["DBP"]["Saturday"]["preBreakPointPrice"],
                postBreakPointPrice=request.data["DBP"]["Saturday"]["postBreakPointPrice"]),

            Sunday=PriceWithBreakPoint.objects.create(
                breakPoint=request.data["DBP"]["Sunday"]["breakPoint"],
                preBreakPointPrice=request.data["DBP"]["Sunday"]["preBreakPointPrice"],
                postBreakPointPrice=request.data["DBP"]["Sunday"]["postBreakPointPrice"])
        )

        time_multiplier_factor = TimeMultiplierFactor.objects.create(
            breakPoint1=request.data["TMF"]["breakPoint1"],
            breakPoint2=request.data["TMF"]["breakPoint2"],
            preBreakPointPrice=request.data["TMF"]["preBreakPointPrice"],
            midBreakPointPrice=request.data["TMF"]["midBreakPointPrice"],
            endBreakPointPrice=request.data["TMF"]["endBreakPointPrice"],
        )

        distance_additional_price = PriceWithBreakPoint.objects.create(
            breakPoint=request.data["DAP"]["breakPoint"],
            preBreakPointPrice=request.data["DAP"]["preBreakPointPrice"],
            postBreakPointPrice=request.data["DAP"]["postBreakPointPrice"],
        )

        waiting_charge = PriceWithBreakPoint.objects.create(
            breakPoint=request.data["WC"]["breakPoint"],
            preBreakPointPrice=request.data["WC"]["preBreakPointPrice"],
            postBreakPointPrice=request.data["WC"]["postBreakPointPrice"],
        )

        # Create and save the PriceConfig instance
        price_config = PriceConfig.objects.create(
            DBP=day_based_pricing,
            DAP=distance_additional_price,
            TMF=time_multiplier_factor,
            WC=waiting_charge
        )

        price_config.save()

        return Response({"status": "created", "yourData": request.data}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"status": "failed", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get all configs
@csrf_exempt
@api_view(['GET'])
def get_price_config(request):
    try:
        # Retrieve the PriceConfig instance from the database
        # Fetching the first PriceConfig instance
        # You can modify this based on your specific requirements
        price_configs = PriceConfig.objects.all()

        if not price_configs:
            # If no PriceConfig instance exists in the database, return a 404 Not Found response
            return Response({"status": "failed", "error": "PriceConfig not found"}, status=status.HTTP_404_NOT_FOUND)

        completeResponse = []
        # Serialize the PriceConfig instance into JSON
        for price_config in price_configs:
            serializer = PriceConfigSerializer(price_config)

            data = serializer.data

            DBP = data["DBP"]
            dbp = get_object_or_404(DayBasedPricing, id=DBP)
            data["DBP"] = DayBasedPricingSerializer(dbp).data

            days = []
            for i in days_of_week:
                day = get_object_or_404(
                    PriceWithBreakPoint, id=data["DBP"][i])
                days.append(
                    {"day": i, **PriceWithBreakPointSerializer(day).data})

            data["DBP"] = days
            DAP = data["DAP"]
            dap = get_object_or_404(PriceWithBreakPoint, id=DAP)
            data["DAP"] = PriceWithBreakPointSerializer(dap).data

            TMF = data["TMF"]
            tmf = get_object_or_404(TimeMultiplierFactor, id=TMF)
            data["TMF"] = TimeMultiplierFactorSerializer(tmf).data

            WC = data["WC"]
            wc = get_object_or_404(PriceWithBreakPoint, id=WC)
            data["WC"] = PriceWithBreakPointSerializer(wc).data

            completeResponse.append(data)

        # Return the serialized data as JSON response
        return Response({"status": "success", "count": len(completeResponse), "data": completeResponse}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"status": "failed", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Set config to live
@api_view(['POST'])
def set_live(request):
    data = request.data
    price_config_id = data.get('id')

    if price_config_id is None:
        return JsonResponse({"error": "Please provide 'id' in the request data."}, status=400)

    # Find the PriceConfig instance by its ID
    price_config = get_object_or_404(PriceConfig, id=price_config_id)

    # Get the currently live PriceConfig instance if any
    currently_live = PriceConfig.objects.filter(IsLive=True).first()

    try:
        # Update the IsLive status of the found PriceConfig
        PriceConfig.objects.filter(id=price_config.id).update(IsLive=True)

        # Set the IsLive status of the previously live PriceConfig to False
        if currently_live:
            PriceConfig.objects.filter(
                id=currently_live.id).update(IsLive=False)

        return JsonResponse({"status": "success", "message": "PriceConfig status updated successfully."}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

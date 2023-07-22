from django.db import models

# Create your models here.


class TimeMultiplierFactor(models.Model):
    # first break-point time
    breakPoint1 = models.FloatField()

    # second break-point time
    breakPoint2 = models.FloatField()

    # before first break-point
    preBreakPointPrice = models.FloatField()

    # between break-points
    midBreakPointPrice = models.FloatField()

    # post break-points
    endBreakPointPrice = models.FloatField()


# to allow storage of dynamic price with a single breakpoint

class PriceWithBreakPoint(models.Model):
    # in Kms
    breakPoint = models.FloatField()

    # price before break-point
    preBreakPointPrice = models.FloatField()

    # price after break-point
    postBreakPointPrice = models.FloatField()


class DayBasedPricing(models.Model):
    Monday = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='monday')
    Tuesday = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='tuesday')
    Wednesday = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='wednesday')
    Thursday = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='thursday')
    Friday = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='friday')
    Saturday = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='saturday')
    Sunday = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='sunday')


class PriceConfig(models.Model):
    DBP = models.ForeignKey(
        DayBasedPricing, on_delete=models.CASCADE, related_name='DBP')
    DAP = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='DAP')
    TMF = models.ForeignKey(
        TimeMultiplierFactor, on_delete=models.CASCADE, related_name='TMF')
    WC = models.ForeignKey(
        PriceWithBreakPoint, on_delete=models.CASCADE, related_name='WC')
    IsLive = models.BooleanField(default=False, null=True, blank=True)

    # Adding a property to access related objects
    @property
    def day_based_pricing(self):
        return {
            "Monday": self.DBP.Monday,
            "Tuesday": self.DBP.Tuesday,
            "Wednesday": self.DBP.Wednesday,
            "Thursday": self.DBP.Thursday,
            "Friday": self.DBP.Friday,
            "Saturday": self.DBP.Saturday,
            "Sunday": self.DBP.Sunday,
        }

    @property
    def distance_additional_price(self):
        return self.DAP

    @property
    def time_multiplier_factor(self):
        return self.TMF

    @property
    def waiting_charges(self):
        return self.WC

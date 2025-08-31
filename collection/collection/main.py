import os
import luigi
from abc import ABC, abstractmethod
from collection import raw
from collection import master
from collection import cleanse
from collection import summary
from utils.utils import get_data_dir


class Task(luigi.Task, ABC):
    @property
    @abstractmethod
    def instance(self): ...

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class CostOfLiving(Task):
    instance = raw.CostOfLivingTask()


class CleanseCostOfLiving(luigi.Task):
    instance = cleanse.CostOfLivingTask()

    def requires(self):
        return [CostOfLiving(), CityAndCountry()]


class SummariseCostOfLiving(luigi.Task):
    instance = summary.CostOfLivingTask()

    def requires(self):
        return CleanseCostOfLiving()


class QualityOfLife(luigi.Task):
    instance = raw.QualityOfLifeTask()


class CleanseQualityOfLife(luigi.Task):
    instance = cleanse.QualityOfLifeTask()

    def requires(self):
        return [QualityOfLife(), CityAndCountry()]


class CityAndCountry(luigi.Task):
    instance = master.CityAndCountryTask()

    def requires(self):
        return CostOfLiving()


class Coordinates(luigi.Task):
    instance = master.CoordinatesTask()


class Cpi(luigi.Task):
    instance = raw.CpiTask()


class Crime(luigi.Task):
    instance = raw.CrimeTask()


class CleanseCrime(luigi.Task):
    instance = cleanse.CrimeTask()

    def requires(self):
        return [Crime(), CityAndCountry()]


class Happiness(luigi.Task):
    instance = raw.HappinessTask()


class CleanseHappiness(luigi.Task):
    instance = cleanse.HappinessTask()

    def requires(self):
        return [Happiness(), CityAndCountry()]


class Weather(luigi.Task):
    instance = raw.WeatherTask()

    def requires(self):
        return Coordinates()


class CleanseWeather(luigi.Task):
    instance = cleanse.WeatherTask()

    def requires(self):
        return [Weather(), CityAndCountry()]


class WorkingPovertyRate(luigi.Task):
    instance = raw.WorkingPovertyRate()


class SocialProtection(luigi.Task):
    instance = raw.SocialProtection()


class WomenInSeniorAndMiddlePosition(luigi.Task):
    instance = raw.WomenInSeniorAndMiddlePosition()


class WomenInManagerialPosition(luigi.Task):
    instance = raw.WomenInManagerialPosition()


class AnnualGrowthRatePerWorker(luigi.Task):
    instance = raw.AnnualGrowthRatePerWorker()


class InformalEmployment(luigi.Task):
    instance = raw.InformalEmployment()


class AverageHourlyEarnings(luigi.Task):
    instance = raw.AverageHourlyEarnings()


class UnemploymentRate(luigi.Task):
    instance = raw.UnemploymentRate()


class UnemploymentRateDisability(luigi.Task):
    instance = raw.UnemploymentRateDisability()


class YouthNeetProportion(luigi.Task):
    instance = raw.YouthNeetProportion()


class LabourRights(luigi.Task):
    instance = raw.LabourRights()


class HappinessQOL(luigi.Task):
    instance = summary.HappinessQOLTask()

    def requires(self):
        return [CleanseHappiness(), CleanseQualityOfLife()]


class All(luigi.Task):
    success_marker = get_data_dir() / ".success"

    def requires(self):
        return [
            CityAndCountry(),
            Cpi(),
            # CleanseWeather(),
            SummariseCostOfLiving(),
            CleanseCrime(),
            WorkingPovertyRate(),
            SocialProtection(),
            WomenInSeniorAndMiddlePosition(),
            WomenInManagerialPosition(),
            AnnualGrowthRatePerWorker(),
            InformalEmployment(),
            AverageHourlyEarnings(),
            UnemploymentRate(),
            UnemploymentRateDisability(),
            YouthNeetProportion(),
            LabourRights(),
            HappinessQOL(),
        ]


if __name__ == "__main__":
    luigi.build([All()], workers=os.cpu_count() - 1, local_scheduler=True)

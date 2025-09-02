import os
import luigi
from collection import raw
from collection import master
from collection import cleanse
from collection import summary
from utils.utils import get_data_dir


class CostOfLiving(luigi.Task):
    instance = raw.CostOfLivingTask()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class CleanseCostOfLiving(luigi.Task):
    instance = cleanse.CostOfLivingTask()

    def requires(self):
        return [CostOfLiving(), CityAndCountry()]

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class SummariseCostOfLiving(luigi.Task):
    instance = summary.CostOfLivingTask()

    def requires(self):
        return CleanseCostOfLiving()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class QualityOfLife(luigi.Task):
    instance = raw.QualityOfLifeTask()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class CleanseQualityOfLife(luigi.Task):
    instance = cleanse.QualityOfLifeTask()

    def requires(self):
        return [QualityOfLife(), CityAndCountry()]

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class CityAndCountry(luigi.Task):
    instance = master.CityAndCountryTask()

    def requires(self):
        return CostOfLiving()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class Coordinates(luigi.Task):
    instance = master.CoordinatesTask()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class Cpi(luigi.Task):
    instance = raw.CpiTask()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class Crime(luigi.Task):
    instance = raw.CrimeTask()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class CleanseCrime(luigi.Task):
    instance = cleanse.CrimeTask()

    def requires(self):
        return [Crime(), CityAndCountry()]

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class Happiness(luigi.Task):
    instance = raw.HappinessTask()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class CleanseHappiness(luigi.Task):
    instance = cleanse.HappinessTask()

    def requires(self):
        return [Happiness(), CityAndCountry()]

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class Weather(luigi.Task):
    instance = raw.WeatherTask()

    def requires(self):
        return Coordinates()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class CleanseWeather(luigi.Task):
    instance = cleanse.WeatherTask()

    def requires(self):
        return [Weather(), CityAndCountry()]

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class WorkingPovertyRate(luigi.Task):
    instance = raw.WorkingPovertyRate()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class SocialProtection(luigi.Task):
    instance = raw.SocialProtection()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class WomenInSeniorAndMiddlePosition(luigi.Task):
    instance = raw.WomenInSeniorAndMiddlePosition()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class WomenInManagerialPosition(luigi.Task):
    instance = raw.WomenInManagerialPosition()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class AnnualGrowthRatePerWorker(luigi.Task):
    instance = raw.AnnualGrowthRatePerWorker()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class InformalEmployment(luigi.Task):
    instance = raw.InformalEmployment()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class AverageHourlyEarnings(luigi.Task):
    instance = raw.AverageHourlyEarnings()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class UnemploymentRate(luigi.Task):
    instance = raw.UnemploymentRate()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class UnemploymentRateDisability(luigi.Task):
    instance = raw.UnemploymentRateDisability()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class YouthNeetProportion(luigi.Task):
    instance = raw.YouthNeetProportion()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class LabourRights(luigi.Task):
    instance = raw.LabourRights()

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


class HappinessQOL(luigi.Task):
    instance = summary.HappinessQOLTask()

    def requires(self):
        return [CleanseHappiness(), CleanseQualityOfLife()]

    def run(self):
        self.instance.run()

    def output(self):
        return self.instance.output()


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

    def run(self):
        self.success_marker.touch()

    def output(self):
        return luigi.LocalTarget(self.success_marker)


if __name__ == "__main__":
    luigi.build([All()], workers=os.cpu_count() - 1, local_scheduler=True)

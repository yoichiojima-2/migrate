import os
import luigi
from city_to_country import CityToCountryTask
from cost_of_living import CostOfLivingTask
from cpi import CpiTask
from crime import CrimeTask
from happiness import HappinessTask
from labour import (
    WorkingPovertyRate,
    SocialProtection,
    WomenInSeniorAndMiddlePosition,
    WomenInSeniorAndMiddlePosition,
    WomenInManagerialPosition,
    AnnualGrowthRatePerWorker,
    InformalEmployment,
    AverageHourlyEarnings,
    UnemploymentRate,
    UnemploymentRateDisability,
    YouthNeetProportion,
    LabourRights,
)
from utils.utils import get_data_dir


class CostOfLiving(luigi.Task):
    instance = CostOfLivingTask()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)



class CityToCountry(luigi.Task):
    instance = CityToCountryTask()

    def requires(self):
        return CostOfLiving()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class Cpi(luigi.Task):
    instance = CpiTask()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class Crime(luigi.Task):
    instance = CrimeTask()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class Happiness(luigi.Task):
    instance = HappinessTask()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class WorkingPovertyRate(luigi.Task):
    instance = WorkingPovertyRate()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class SocialProtection(luigi.Task):
    instance = SocialProtection()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class WomenInSeniorAndMiddlePosition(luigi.Task):
    instance = WomenInSeniorAndMiddlePosition()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class WomenInManagerialPosition(luigi.Task):
    instance = WomenInManagerialPosition()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class AnnualGrowthRatePerWorker(luigi.Task):
    instance = AnnualGrowthRatePerWorker()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class InformalEmployment(luigi.Task):
    instance = InformalEmployment()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class AverageHourlyEarnings(luigi.Task):
    instance = AverageHourlyEarnings()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class UnemploymentRate(luigi.Task):
    instance = UnemploymentRate()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class UnemploymentRateDisability(luigi.Task):
    instance = UnemploymentRateDisability()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class YouthNeetProportion(luigi.Task):
    instance = YouthNeetProportion()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class LabourRights(luigi.Task):
    instance = LabourRights()

    def run(self):
        self.instance.run()
    
    def output(self):
        return luigi.LocalTarget(self.instance.output_path)


class All(luigi.Task):
    success_marker = get_data_dir() / ".success"

    def requires(self):
        return [
            CityToCountry(), 
            Cpi(), 
            Crime(), 
            Happiness(), 
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
            LabourRights()
        ]

    def run(self):
        self.success_marker.touch()


    def output(self):
        return luigi.LocalTarget(self.success_marker)



if __name__ == "__main__":
    luigi.build([All()], workers=os.cpu_count() - 1)
import os
import luigi
from collection import raw
from collection import master
from collection import cleanse
from utils.utils import get_data_dir


class CostOfLiving(luigi.Task):
    instance = raw.CostOfLivingTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class CleanseCostOfLiving(luigi.Task):
    instance = cleanse.CostOfLivingTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class CityToCountry(luigi.Task):
    instance = master.CityToCountryTask()

    def requires(self):
        return CostOfLiving()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class Cpi(luigi.Task):
    instance = raw.CpiTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class Crime(luigi.Task):
    instance = raw.CrimeTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class Happiness(luigi.Task):
    instance = raw.HappinessTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class CleanseHappiness(luigi.Task):
    instance = cleanse.HappinessTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class WorkingPovertyRate(luigi.Task):
    instance = raw.WorkingPovertyRate()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class SocialProtection(luigi.Task):
    instance = raw.SocialProtection()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class WomenInSeniorAndMiddlePosition(luigi.Task):
    instance = raw.WomenInSeniorAndMiddlePosition()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class WomenInManagerialPosition(luigi.Task):
    instance = raw.WomenInManagerialPosition()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class AnnualGrowthRatePerWorker(luigi.Task):
    instance = raw.AnnualGrowthRatePerWorker()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class InformalEmployment(luigi.Task):
    instance = raw.InformalEmployment()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class AverageHourlyEarnings(luigi.Task):
    instance = raw.AverageHourlyEarnings()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class UnemploymentRate(luigi.Task):
    instance = raw.UnemploymentRate()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class UnemploymentRateDisability(luigi.Task):
    instance = raw.UnemploymentRateDisability()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class YouthNeetProportion(luigi.Task):
    instance = raw.YouthNeetProportion()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class LabourRights(luigi.Task):
    instance = raw.LabourRights()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class QualityOfLife(luigi.Task):
    instance = raw.QualityOfLifeTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class CleanseQualityOfLife(luigi.Task):
    instance = cleanse.QualityOfLifeTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class CleanseCrime(luigi.Task):
    instance = cleanse.CrimeTask()

    def run(self):
        self.instance.run()

    def output(self):
        return luigi.LocalTarget(get_data_dir() / self.instance.output_path)


class All(luigi.Task):
    success_marker = get_data_dir() / ".success"

    def requires(self):
        return [
            CostOfLiving(),
            CleanseCostOfLiving(),
            CityToCountry(),
            Cpi(),
            Crime(),
            CleanseCrime(),
            Happiness(),
            CleanseHappiness(),
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
            QualityOfLife(),
            CleanseQualityOfLife(),
        ]

    def run(self):
        self.success_marker.touch()

    def output(self):
        return luigi.LocalTarget(self.success_marker)


if __name__ == "__main__":
    luigi.build([All()], workers=os.cpu_count() - 1)

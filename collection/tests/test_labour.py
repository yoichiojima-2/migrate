from pathlib import Path
import luigi
from utils.utils import get_data_dir

from collection.main import (
    WorkingPovertyRate,
    SocialProtection,
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


def test_working_poverty_rate():
    luigi.build([WorkingPovertyRate()], local_scheduler=True)
    assert Path(get_data_dir() / WorkingPovertyRate().output().path).exists()


def test_social_protection():
    luigi.build([SocialProtection()], local_scheduler=True)
    assert Path(get_data_dir() / SocialProtection().output().path).exists()


def test_women_in_senior_and_middle_position():
    luigi.build([WomenInSeniorAndMiddlePosition()], local_scheduler=True)
    assert Path(get_data_dir() / WomenInSeniorAndMiddlePosition().output().path).exists()


def test_women_in_managerial_position():
    luigi.build([WomenInManagerialPosition()], local_scheduler=True)
    assert Path(get_data_dir() / WomenInManagerialPosition().output().path).exists()


def test_annual_growth_rate_per_worker():
    luigi.build([AnnualGrowthRatePerWorker()], local_scheduler=True)
    assert Path(get_data_dir() / AnnualGrowthRatePerWorker().output().path).exists()


def test_informal_employment():
    luigi.build([InformalEmployment()], local_scheduler=True)
    assert Path(get_data_dir() / InformalEmployment().output().path).exists()


def test_average_hourly_earnings():
    luigi.build([AverageHourlyEarnings()], local_scheduler=True)
    assert Path(get_data_dir() / AverageHourlyEarnings().output().path).exists()


def test_unemployment_rate():
    luigi.build([UnemploymentRate()], local_scheduler=True)
    assert Path(get_data_dir() / UnemploymentRate().output().path).exists()


def test_unemployment_rate_disability():
    luigi.build([UnemploymentRateDisability()], local_scheduler=True)
    assert Path(get_data_dir() / UnemploymentRateDisability().output().path).exists()


def test_youth_neet_proportion():
    luigi.build([YouthNeetProportion()], local_scheduler=True)
    assert Path(get_data_dir() / YouthNeetProportion().output().path).exists()


def test_labour_rights():
    luigi.build([LabourRights()], local_scheduler=True)
    assert Path(get_data_dir() / LabourRights().output().path).exists()

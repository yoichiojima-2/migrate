from collection import labour
from tests.test_lib import run_and_check_output


def test_working_poverty_rate():
    run_and_check_output(labour.WorkingPovertyRate, "raw/working_poverty_rate.json")


def test_social_protection():
    run_and_check_output(labour.SocialProtection, "raw/social_protection.json")


def test_women_in_senior_and_middle_position():
    run_and_check_output(labour.WomenInSeniorAndMiddlePosition, "raw/women_in_senior_and_middle_position.json")


def test_women_in_managerial_position():
    run_and_check_output(labour.WomenInManagerialPosition, "raw/women_in_managerial_position.json")


def test_annual_growth_rate_per_worker():
    run_and_check_output(labour.AnnualGrowthRatePerWorker, "raw/annual_growth_rate_per_worker.json")


def test_informal_employment():
    run_and_check_output(labour.InformalEmployment, "raw/informal_employment.json")


def test_average_hourly_earnings():
    run_and_check_output(labour.AverageHourlyEarnings, "raw/average_hourly_earnings.json")


def test_unemployment_rate():
    run_and_check_output(labour.UnemploymentRate, "raw/unemployment_rate.json")


def test_unemployment_rate_disability():
    run_and_check_output(labour.UnemploymentRateDisability, "raw/unemployment_rate_disability.json")


def test_youth_neet_proportion():
    run_and_check_output(labour.YouthNeetProportion, "raw/youth_neet_proportion.json")


def test_labour_rights():
    run_and_check_output(labour.LabourRights, "raw/labour_rights.json")

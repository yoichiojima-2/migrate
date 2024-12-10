from collection import labour
from tests.test_lib import run_and_check_output


def _test_base(cls):
    run_and_check_output(cls, cls().output_path)


def test_working_poverty_rate():
    _test_base(labour.WorkingPovertyRate)


def test_social_protection():
    _test_base(labour.WorkingPovertyRate)


def test_women_in_senior_and_middle_position():
    _test_base(labour.WomenInSeniorAndMiddlePosition)


def test_women_in_managerial_position():
    _test_base(labour.WomenInManagerialPosition)


def test_annual_growth_rate_per_worker():
    _test_base(labour.AnnualGrowthRatePerWorker)


def test_informal_employment():
    _test_base(labour.InformalEmployment)


def test_average_hourly_earnings():
    _test_base(labour.AverageHourlyEarnings)


def test_unemployment_rate():
    _test_base(labour.UnemploymentRate)


def test_unemployment_rate_disability():
    _test_base(labour.UnemploymentRateDisability)


def test_youth_neet_proportion():
    _test_base(labour.YouthNeetProportion)


def test_labour_rights():
    _test_base(labour.LabourRights)

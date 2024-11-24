import os
import json
from pathlib import Path
from pprint import pprint
from data_collection import labor


def test_working_poverty_rate():
    labor.WorkingPovertyRate().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "working_poverty_rate.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_social_protection():
    labor.SocialProtection().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "social_protection.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_women_in_senior_and_middle_position():
    labor.WomenInSeniorAndMiddlePosition().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "women_in_senior_and_middle_position.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_women_in_managerial_position():
    labor.WomenInManagerialPosition().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "women_in_managerial_position.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_annual_growth_rate_per_worker():
    labor.AnnualGrowthRatePerWorker().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "annual_growth_rate_per_worker.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_informal_employment():
    labor.InformalEmployment().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "informal_employment.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_average_hourly_earnings():
    labor.AverageHourlyEarnings().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "average_hourly_earnings.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_unemployment_rate():
    labor.UnemploymentRate().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "unemployment_rate.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_unemployment_rate_disability():
    labor.UnemploymentRateDisability().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "unemployment_rate_disability.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_youth_neet_proportion():
    labor.YouthNeetProportion().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "youth_neet_proportion.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0


def test_labour_rights():
    labor.LabourRights().run()
    output = Path(os.getenv("DATA_DIR", "data")) / "labour_rights.json"
    assert output.exists()
    with output.open() as f:
        data = json.load(f)
    pprint(data[:5])
    assert len(data) > 0

# def test_cost_of_living():
#     run_and_check_output(CostOfLivingTask, CostOfLivingTask.output_name)
#     df = pd.read_json(f"{os.getenv('APP_ROOT')}/data/{CostOfLivingTask.output_name}")
#     assert set(CostOfLivingTask.cities) == set(df["city"].drop_duplicates().values)

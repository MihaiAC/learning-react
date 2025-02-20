export default class InputData {
  constructor(
    initialInvestment = "",
    annualInvestment = "",
    expectedReturn = "",
    duration = ""
  ) {
    this.initialInvestment = initialInvestment;
    this.annualInvestment = annualInvestment;
    this.expectedReturn = expectedReturn;
    this.duration = duration;
  }

  static newFromInputData(inputData) {
    return new InputData(
      inputData.initialInvestment,
      inputData.annualInvestment,
      inputData.expectedReturn,
      inputData.duration
    );
  }
}

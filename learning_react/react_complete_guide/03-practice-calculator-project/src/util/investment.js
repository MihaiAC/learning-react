// This function expects a JS object as an argument
// The object should contain the following properties
// - inputData['initialInvestment']: The initial investment amount
// - inputData['annualInvestment']: The amount invested every year
// - inputData['expectedReturn']: The expected (annual) rate of return
// - inputData['duration']: The investment inputData['duration'] (time frame)
export function calculateInvestmentResults({ inputData }) {
  console.log(inputData + "FROM INVESTMENT.JS");
  const annualData = [];
  let investmentValue = inputData["initialInvestment"];

  for (let i = 0; i < inputData["duration"]; i++) {
    const interestEarnedInYear =
      investmentValue * (inputData["expectedReturn"] / 100);
    investmentValue += interestEarnedInYear + inputData["annualInvestment"];
    annualData.push({
      year: i + 1, // year identifier
      interest: interestEarnedInYear, // the amount of interest earned in this year
      valueEndOfYear: investmentValue, // investment value at end of year
      annualInvestment: inputData["annualInvestment"], // investment added in this year
    });
  }

  return annualData;
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

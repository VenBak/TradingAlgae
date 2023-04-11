const inquirer = require('inquirer');

inquirer
  .prompt([
    {
        type: "input",
        name: "shortPeriod",
        message: "Enter the short period"
    },
    {
        type: "input",
        name: "longPeriod",
        message: "Enter the long period"  
    },
    {
        type: "input",
        name: "signalPeriod",
        message: "Enter the signal period"  
    },
    {
        type: "input",
        name: "longPeriod",
        message: "Enter the si period"  
    }
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers)
  })
  .catch((error) => {
    console.log(error)
});


// Define the time period for the moving averages and the MACD
const shortPeriod = 12; // Short-term moving average period
const longPeriod = 26; // Long-term moving average period
const signalPeriod = 9; // Signal line period for the MACD

// Define an array to hold the stock's historical closing prices
const closingPrices = [/* insert array of historical closing prices here */];

// Calculate the short-term and long-term moving averages
const shortMA = calculateMovingAverage(closingPrices, shortPeriod);
const longMA = calculateMovingAverage(closingPrices, longPeriod);

// Calculate the MACD and signal line
const macd = calculateMACD(closingPrices, shortPeriod, longPeriod, signalPeriod);
const signal = calculateMovingAverage(macd, signalPeriod);

// Determine the trend based on the MACD crossovers
const diff = macd[macd.length - 1] - signal[signal.length - 1];
const probability = 1 / (1 + Math.exp(-diff));

if (probability > 0.5) {
  console.log(`The stock is in an uptrend with ${probability * 100}% probability`);
} else {
  console.log(`The stock is in a downtrend with ${(1 - probability) * 100}% probability`);
}

// Function to calculate a simple moving average
function calculateMovingAverage(prices, period) {
  const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
  return sum / period;
}

// Function to calculate the MACD
function calculateMACD(prices, shortPeriod, longPeriod, signalPeriod) {
  const shortMA = calculateMovingAverage(prices, shortPeriod);
  const longMA = calculateMovingAverage(prices, longPeriod);
  const macd = [];
  for (let i = longPeriod; i < prices.length; i++) {
    const shortEMA = calculateExponentialMovingAverage(prices.slice(i - shortPeriod, i), shortPeriod);
    const longEMA = calculateExponentialMovingAverage(prices.slice(i - longPeriod, i), longPeriod);
    macd.push(shortEMA - longEMA);
  }
  return macd;
}

// Function to calculate an exponential moving average
function calculateExponentialMovingAverage(prices, period) {
  let ema = prices[0];
  const multiplier = 2 / (period + 1);
  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }
  return ema;
}

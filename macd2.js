// Define the number of days the average will be done over
// const period = 8;

// // Sample Data
var stockData = [
    { date: "2022-01-03", close: 100 },
    { date: "2022-01-04", close: 110 },
    { date: "2022-01-05", close: 120 },
    { date: "2022-01-06", close: 125 },
    { date: "2022-01-07", close: 130 },
    { date: "2022-01-10", close: 135 },
    { date: "2022-01-11", close: 130 },
    { date: "2022-01-12", close: 125 },
    { date: "2022-01-13", close: 120 },
    { date: "2022-01-14", close: 110 },
    { date: "2022-01-17", close: 100 },
    { date: "2022-01-18", close: 90 },
    { date: "2022-01-19", close: 80 },
    { date: "2022-01-20", close: 75 },
    { date: "2022-01-21", close: 70 }
];

// Real Data


function calculateMovingAverage(stockData, period) {
    const movingAverage = [];
    for (let i = 0; i < stockData.length; i++) {
      if (i < period - 1) {
        movingAverage.push(null);
        continue;
      }
      let sum = 0;
      for (let j = i - period + 1; j <= i; j++) {
        sum += stockData[j].close;
      }
      movingAverage.push(sum / period);
    }
    return movingAverage;
}
  
function checkMarketConditions(stockData) {
    const trendData = stockData.slice(-10); // consider only the latest 10 data points
    const average = trendData.reduce((acc, cur) => acc + cur.close, 0) / trendData.length;
    const standardDeviation = Math.sqrt(trendData.reduce((acc, cur) => acc + Math.pow(cur.close - average, 2), 0) / trendData.length);
    const probability = 1 / (1 + Math.exp(-(average - trendData[trendData.length - 1].close) / standardDeviation));
    if (probability >= 0.7) {
        console.log("The stock is likely to be in an uptrend.");
    } else if (probability <= 0.3) {
        console.log("The stock is likely to be in a downtrend.");
    } else {
        console.log("The stock is likely to be in a sideways trend.");
    }
}

function calculateMACD(data, slowEMA = 26, fastEMA = 12, signalEMA = 9) {
  // Extract closing prices from stock data
  let closingPrices = data.map(datum => datum.close);
  
  // Calculate slow and fast EMA
  let slowEMAArray = calculateEMA(closingPrices, slowEMA);
  let fastEMAArray = calculateEMA(closingPrices, fastEMA);
  
  // Calculate MACD line
  let MACDArray = [];
  for (let i = 0; i < closingPrices.length; i++) {
    MACDArray.push(fastEMAArray[i] - slowEMAArray[i]);
  }
  
  // Calculate signal line using EMA of MACD line
  let signalLineArray = calculateEMA(MACDArray, signalEMA);
  
  return { MACD: MACDArray, signal: signalLineArray };
}

function calculateEMA(data, period) {
  let EMAArray = [];
  let validPeriods = 0;
  let multiplier = 2 / (period + 1);

  // Calculate first EMA as simple moving average
  let sum = 0;
  for (let i = 0; i < period; i++) {
    if (!isNaN(data[i])) { // check if data[i] is a valid number
      sum += data[i];
      validPeriods++;
    }
  }
  let SMA = sum / validPeriods;
  EMAArray.push(SMA);

  // Calculate subsequent EMAs using multiplier
  for (let i = period; i < data.length; i++) {
    if (!isNaN(data[i])) { // check if data[i] is a valid number
      validPeriods++;
      let adjustedMultiplier = 2 / (validPeriods + 1);
      let EMA = (data[i] - EMAArray[i - period]) * adjustedMultiplier + EMAArray[i - period];
      EMAArray.push(EMA);
    } else {
      // Adjust multiplier for skipped period
      validPeriods++;
      multiplier = 2 / (validPeriods + 1);
      EMAArray.push(NaN);
    }
  }

  return EMAArray;
}



module.exports = {
    calculateMovingAverage,
    checkMarketConditions,
    calculateMACD,
    calculateEMA
};

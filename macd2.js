// Define the number of days the average will be done over
const period = 8;

// Sample Data
const stockData = [
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
    { date: "2022-01-21", close: 70 },
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

const movingAverage = calculateMovingAverage(stockData, period);

console.log(movingAverage);
checkMarketConditions(stockData);
  
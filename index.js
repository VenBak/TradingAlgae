const finnhub = require('finnhub');
const timestamp = require('unix-timestamp');
const { calculateMovingAverage, checkMarketConditions,calculateMACD ,calculateEMA } = require('./macd2')

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cgdjiv9r01qpf4i24opgcgdjiv9r01qpf4i24oq0" // Replace this
const finnhubClient = new finnhub.DefaultApi()
timestamp.round = true
// 30 day data
const unix30days = timestamp.now() -  2628288

// 6 months data
const unix6months = timestamp.now() -   15780000

// List of stocks

// Stock candles
finnhubClient.stockCandles("AAPL", "D", unix6months, timestamp.now(), (error, data, response) => {
    // console.log(data)
    // console.log(data.c)
    // console.log(data.t)
    const stockData = []

    for (let index = 0; index < data.c.length; index++) {
        // console.log(data.t[index])
        // console.log(data.c[index])
        const timestampdata = data.t[index]
        const closingdata = data.c[index]

        const timeDate = timestamp.toDate(timestampdata) 

        const obj = {
            date: timeDate.toISOString().slice(0, 10),
            close: Math.round(closingdata)
        }
        stockData.push(obj)
    }
    console.log(stockData)
    let period = 8

    console.log(calculateMovingAverage(stockData, period))
    checkMarketConditions(stockData)
    console.log(calculateMACD(stockData))
    
});

// Round the timestamp
timestamp.round = true

// Unix timestamp of today
console.log()

// Unix timestamp of 30 days ago
console.log(timestamp.now() -  2628288)


// Symbol
// Supported resolution includes 1, 5, 15, 30, 60, D, W, M 
// From
// To
const finnhub = require('finnhub');
const timestamp = require('unix-timestamp');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cgdjiv9r01qpf4i24opgcgdjiv9r01qpf4i24oq0" // Replace this
const finnhubClient = new finnhub.DefaultApi()
timestamp.round = true
// const timestampToday = 

// Stock candles
finnhubClient.stockCandles("AAPL", "D", timestamp.now() -  2628288, timestamp.now(), (error, data, response) => {
    console.log(data)
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
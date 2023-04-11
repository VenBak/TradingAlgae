// Define the short and long windows for the moving averages
const short_window = 50;
const long_window = 200;

// Define the maximum loss and gain percentages
const max_loss = 0.02;
const max_gain = 0.05;

// Load the stock data
const stock_data = [
  { date: "2022-01-03", close: 100 },
  { date: "2022-01-04", close: 102 },
  { date: "2022-01-05", close: 101 },
  { date: "2022-01-06", close: 105 },
  { date: "2022-01-07", close: 103 },
  // add more data here...
];

// Calculate the short-term and long-term moving averages
for (let i = long_window; i < stock_data.length; i++) {
  let short_ma = 0;
  let long_ma = 0;
  for (let j = 0; j < short_window; j++) {
    short_ma += stock_data[i - j].close;
  }
  for (let j = 0; j < long_window; j++) {
    long_ma += stock_data[i - j].close;
  }
  stock_data[i].short_ma = short_ma / short_window;
  stock_data[i].long_ma = long_ma / long_window;
}

// Initialize variables for the position and entry price
let position = null;
let entry_price = null;

// Loop over the stock data
for (let i = long_window; i < stock_data.length; i++) {
  // Check if the short MA has crossed above the long MA
  if (stock_data[i].short_ma > stock_data[i].long_ma) {
    // If not in a position, enter a long position
    if (position === null) {
      position = "long";
      entry_price = stock_data[i].close;
      console.log(`Entering long position at ${entry_price}`);
    }
  }
  // Check if the short MA has crossed below the long MA
  else if (stock_data[i].short_ma < stock_data[i].long_ma) {
    // If in a long position, exit the position and take profits or losses
    if (position === "long") {
      // Check if the stop loss order has been triggered
      if (stock_data[i].close > entry_price * (1 + max_loss)) {
        console.log(`Stop loss order triggered at ${stock_data[i].close}`);
      }
      // Check if the take profit order has been triggered
      else if (stock_data[i].close < entry_price * (1 - max_gain)) {
        console.log(`Take profit order triggered at ${stock_data[i].close}`);
      }
      // If neither stop loss nor take profit has been triggered, exit the position
      else {
        const exit_price = stock_data[i].close;
        const pnl = (exit_price - entry_price) / entry_price;
        console.log(`Exiting long position at ${exit_price} with P&L of ${pnl}`);
      }
      position = null;
      entry_price = null;
    }
  }
}


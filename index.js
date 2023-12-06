const express = require('express')
const cors = require('cors')
const schema = require('./schema')



const app = express();
app.use(cors());

app.get('/', (req, res) => {
  console.log("Just got a request!")
  res.send('Welcome to my-health api');
});

app.get('/heartbeat', (req, res) => {
  console.log("Just got a request!")
  res.send('I am alive');
});

app.get('/health-metrics', (req, res) => {
  console.log("loaded schema")
  res.json(schema);
});


app.get('/stocks/nifty-range', (req, res) => {
  let range_type = req.query.range_type
  let vix = req.query.vix
  let nifty_close = req.query.nifty_close

  let response = {}

  let range = 1

  switch(range_type){
    case 'day':
      range = 365;
      break;
    case 'week':
      range = 52;
      break;
    case 'month':
      range = 12;
      break;
  }


  
  let percentage = Math.sqrt(range)/(vix*100) ;
  let predicted_high = Math.round(nifty_close + (nifty_close*percentage))
  let predicted_low = Math.round(nifty_close - (nifty_close*percentage))

  let _request = {}
  _request.vix = vix
  _request.range_type=range_type
  _request.nifty_close = nifty_close


  let _prediction = {} 
  _prediction.high=predicted_high
  _prediction.low=predicted_low
  _prediction.percentage=percentage

  response.request = _request
  response.prediction = _prediction
  
  res.json(response);
});

app.listen(process.env.PORT || 3000)

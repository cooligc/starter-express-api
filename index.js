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

app.listen(process.env.PORT || 3000)

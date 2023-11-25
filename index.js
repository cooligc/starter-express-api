const express = require('express')
const schema = require('./schema')



const app = express()

app.get('/', (req, res) => {
  console.log("Just got a request!")
  res.send('Welcome to my-health api');
});

app.get('/health-metrics', (req, res) => {
  console.log("loaded schema")
  res.json(schema);
});

app.listen(process.env.PORT || 3000)

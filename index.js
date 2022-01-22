const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/',(req, res)=>{
    console.log('hello',req.body)
})

app.listen(4331,()=>{
    console.log('Server running on 4331')
})
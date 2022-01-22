const res = require('express/lib/response');

const express = require('express')();

console.log()

express.get('/',(req, res)=>{
    console.log('hello')

    // res.send('hyellx')
})

express.listen(4331,()=>{
    console.log('Server running on 4331')
})
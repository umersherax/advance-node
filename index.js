const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./database/user.modal');
const jwt = require('jsonwebtoken');

//  db connection
mongoose
  .connect('mongodb://localhost/mern-stack', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected..."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register', async (req, res)=>{
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        if(user){
            const token = jwt.sign({name: user.name,email: user.email}, 'secret123')
            res.json({status: 'ok', token});
        }
    }catch(err){
        res.json({status: 'something went wrong', err})
    }
});


app.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try{
        const found = await User.findOne({ email , password });
        if(found){
            const token = jwt.sign({ 
                name: found.name,
                email: found.email
             } , 'secret123');
            res.json({status: "ok", token});
        }else{
            res.json({status: "User not foundzz"});
        }
    }catch(err){
        res.json({status: 'some thing went wrong', err})
    }
});

app.get('/get-info', async (req,res)=>{
    const token = req["headers"]["x-access-token"];
    try{
        const decode = jwt.verify(token, 'secret123');
        const info = await User.findOne({ email: decode.email })
        res.json({ info, valid: true });
    }catch(err){
        res.json({ valid: false, err })
    }
})

app.listen(4331,()=>{
    console.log('Server running on 4331')
})
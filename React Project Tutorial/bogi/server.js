const express = require('express');
const mongoose = require('mongoose');
const server = express();
const Bus = require('./models/Bus')
require('dotenv').config({path:'variables.env'});

server.get('/', (req, res) => {
    const newB = new Bus();
    newB.email = 'danny@gmail.com';
    newB.name = 'danny';
    newB.age = 25;
    newB
    .save()
    .then((bus) => {
        console.log(bus);
        res.json({
            message: 'User Created Successfully'
        });
    })
    .catch((err) => {
        res.json({
            message: 'User was not successfully created'
        });
    });
});

console.log(process.env.MONGODB_URL);

server.listen(3000,(err)=>{
    if(err){
        return console.log(err);
    }else{
        mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true}, (err)=> {
            if(err){
                console.log(err);
            }else{
                console.log("Connected to database successfully");
            }
        });
    }
});

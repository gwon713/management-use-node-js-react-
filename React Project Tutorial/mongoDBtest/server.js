const express = require('express');
const mongoose = require('mongoose');
const server = express();
const User = require('./models/User')
require('dotenv').config({path:'variables.env'});

server.get('/', (req, res) => {
    const newUser = new User();
    newUser.email = 'danny@gmail.com';
    newUser.name = 'danny';
    newUser.age = 25;
    newUser
    .save()
    .then((user) => {
        console.log(user);
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


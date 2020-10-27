const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
require("dotenv").config({path:'variables.env'});
var connection = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName:"management"
})
autoIncrement.initialize(connection);


const userSchema = mongoose.Schema({
    image:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    birthday:{
        type: Number,
        required:true
    },
    gender:{
        type: String,
        required:true
    },
    job:{
        type: String,
        required:true
    },
    createdData:{
        type: Date,
        default:Date.now,
    }
})

userSchema.plugin(autoIncrement.plugin,{
     model : 'User', 
     field : 'id', 
     startAt : 1,  
     increment : 1 
});


const User = mongoose.model('User',userSchema);
module.exports = { User };
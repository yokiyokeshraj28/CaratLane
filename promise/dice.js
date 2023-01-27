const { rejects } = require('assert');
const port=3031;
const express=require('express');
const { resolve } = require('path');
const fs=require('fs');
const jsonf=require('./data.json');
const app=express();


app.use('/dice',(req,res)=>{ 
  function dieToss() {
    return Math.floor(Math.random() * 6) + 1;  
  }
  
  function tossASix() {
    return new Promise(function(resolve, reject) {
      var n = Math.floor(Math.random() * 6) + 1;
      if (n === 6) {
        resolve(n);
      } else {
        reject(n);
      }
    });
  }
  
  function logAndTossAgain(toss) {
    console.log("Tossed a " + toss + ", need to try again.");
    return tossASix();
  }
  
  function logSuccess(toss) {
    console.log("Yay, managed to toss a " + toss + ".");
    
  }
  
  function logFailure(toss) {
    console.log("Tossed a " + toss + ". Too bad, couldn't roll a six");
  }
  
  tossASix()
    .then(null, logAndTossAgain)   
    .then(null, logAndTossAgain)   
    .then(logSuccess, logFailure)
   res.send("Success! results are in Terminal");
  });


app.listen(port,()=>{
    console.log("server is runing successfully!"); });
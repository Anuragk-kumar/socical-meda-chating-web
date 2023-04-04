const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codial_development');
const db = mongoose.connection;
db.on("error",console.error.bind,"Error connecting to MongoDB");

db.once('open',function(){
    console.log("Connected with MongoDB");

});

module.exports = db;
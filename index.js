// Entery point for Express
const express = require('express');
// require Cookie parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
// require Express-ejs layouts libriary
const expressLayouts = require('express-ejs-layouts');

// imoprt mongooDB
const db = require('./config/mongoose');
const e = require('express');

app.use(express.urlencoded());
app.use(cookieParser());




//set up static file
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// End of Express Entery point 

// use Express Router
// middleware that is specific to this router
app.use('/',require('./routes'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// to chect if Error in running Server
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is runnig on port: ${port}`);
});
// End the Error 
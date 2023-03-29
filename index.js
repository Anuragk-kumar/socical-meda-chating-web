// Entery point for Express
const express = require('express');
const app = express();
const port = 8000;
// End of Express Entery point 

// use Express Router
// middleware that is specific to this router
app.use('/',require('./routes'));

// to chect if Error in running Server
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`server is runnig on port: ${port}`);
});
// End the Error 
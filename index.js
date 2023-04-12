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

//impoet session and passport|| used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// import mongo store
const MongoStore = require('connect-mongodb-session')(session);





app.use(express.urlencoded());
app.use(cookieParser());




//set up static file
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookies in the db
//express session
app.use(session({
    name:'chirphub',
    // tod change the secret before deployment  in production mode
    secret:'blahsomething',
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            uri:'mongodb://127.0.0.1:27017/codial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )

}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


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

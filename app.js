const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session) //reload pe automatically logout nahi hone dega
const exphbs = require('express-handlebars')
//Loading config file 
dotenv.config({path:'./config/config.env'})

require('./config/passport')(passport)

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'));
}

//Handlebars
app.engine('.hbs',exphbs({defaultLayout:'main', extname:'.hbs'}));
app.set('view engine', '.hbs');

//Imp to put session above passport 
app.use(
    session({
    secret: 'keyboard cat',
    resave: false, //dont't save a session if nothing is initialized
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection : mongoose.connection}) //space b/w store : __ imp.
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname,'public')));
//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`))
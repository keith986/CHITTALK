const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const users = require('./models/users')
const multer= require('multer')
var path = require('path')

const dotenv = require('dotenv')
dotenv.config();

//database
const mongodb = require('mongodb')
const mongoose = require('mongoose')

const url = process.env.dbURL;

mongoose.connect(url)
        .then((result) => {
            console.log('Connected' + result)
        })
        .catch((err) => {
            console.log('Not Connected' + err);
        })

const app = express()

//set session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'my express session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//register view engine
app.set('view engine', 'ejs')

//add middleware
app.use(morgan('dev'))

//use public data
app.use(express.static('public'));

//url extend url
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//set upload folder
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos/')
    },
    filename : (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const uploads = multer({storage: storage});

//listen to port
app.listen('3000', () => {
    console.log('Listening to port 3000');
})

app.get('/', (req, res) => {
    res.render('login');
})

app.post('/', (req,res) => {
const {username, passcode} = req.body;
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', uploads.single('pic'), (req,res) => {
const {username, fname, lname, email, age, phone, dob, relation, country, city, passcode} = req.body;
console.log(req.file.filename);

const usersdata = users({
    username : `${username}`,
    fname : `${fname}`,
    lname : `${lname}`,
    email : `${email}`,
    age: `${age}`,
    phone : `${phone}`,
    dob : `${dob}`,
    relationship: `${relation}`,
    country : `${country}`,
    city : `${city}`,
    images :req.file.filename,
    passcode: `${passcode}`
    });
     
    usersdata.save()
             .then((result) => {
            
                console.log('User added Successfully ' + result);
              })
             .catch((error) => console.log(error));

})
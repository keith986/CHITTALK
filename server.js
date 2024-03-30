const express = require('express')
const morgan = require('morgan')
const conn = require('./models/admin')

const app = express()

//register view engine
app.set('view engine', 'ejs')

//add middleware
app.use(morgan('dev'))

//use public data
app.use(express.static('public'))

//url extend url
app.use(express.urlencoded({extended: false}))

//listen to port
app.listen('3000', () => {
    console.log('Listening to port 3000')
})

app.get('/dashboard', (req,res) => {
    res.render('index')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', (req,res) => {
    const {username , passcode} = req.body;

    const sql = `SELECT * FROM users WHERE username = '${username}' AND passcode = '${passcode}'`;
    conn.query(sql, (error, result) => {

        if(error) {
            console.log(error)
        };
        if(result.length > 0){
            res.render('index', {result})
        }else {
            res.redirect('/login');
            console.log('Wrong Credentials');
        }

    })
})

app.get('/signup', (req,res) => {
    res.render('signup')
})

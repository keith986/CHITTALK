const express = require('express')
const morgan = require('morgan')
const conn = require('./models/admin')
const session = require('express-session')

const app = express()

//set session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


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

app.get('/', (req,res) => {
    if(req.session.view){
    console.log(req.session)
    res.render('index')
    }else{
        res.redirect('/login')
    }
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
            var errs = "Wrong Credentials";
            res.render('login', {errs});
            console.log('Wrong Credentials');
        }

    })
})

app.get('/signup', (req,res) => {
    res.render('signup')
})

app.get('/logout', (req,res) => {

    req.session.destroy((err, result) => {
        res.redirect('/')
        console.log(result)
    })

})
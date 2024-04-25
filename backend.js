const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const users = require('./models/users')
const messages = require('./models/messages')
const multer= require('multer')
var path = require('path')
var fs = require('fs')

const dotenv = require('dotenv')
dotenv.config();

//database
const mongodb = require('mongodb')
const mongoose = require('mongoose')

const url = process.env.dbURL

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
app.use(express.static('public'))
app.use(express.static('photos'))

//url extend url
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//set upload folder
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var dir = './photos';

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename : (req, file, cb) => {
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
console.log(username + passcode);
users.findOne({
    username : username,
    passcode: passcode
             })
    .then((result) => {

        if(result !== null){  
        users.find({_id : {$nin : result._id}})
             .then((results) => {
                res.render('index', {result, rst:results})
             })
             .catch(err => console.log(err));
        }else{
            var errs = "Wrong Credentials";
            res.render('login', {errs});
            console.log(errs);
        }

    })
    .catch((err) =>{
        console.log(err);
    });

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
                res.render('login');
              })
             .catch((error) => console.log(error));
})

app.get('/talk', (req,res) => {
    const userid = req.query.d;

    users.findById(userid)
         .then((result) => {
            if(result !== null){
                users.find({_id : {$nin : result._id}})
                     .then((results) => {
                        res.render('talk', {result, rst: results})
                     })
                     .catch((err) => {console.log(err)})
            }
         })
         .catch(err => console.log(err))

})

app.post('/talk', (req,res) => {
    const userid = req.body.userid;
    const chatid = req.body.chat;

    users.findById(userid)
         .then((result) => {
            if(result !== null){
                users.find({_id : {$nin : result._id}})
                     .then((results) => {
                users.findById(chatid)
                     .then((resultses) => {
                messages.find({$or : [{fromid : userid,toid: chatid},{fromid: chatid, toid: userid}]}).sort({createdAt : 1})
                        .then((resultsess) => {
                            res.render('talk', {chatuser:resultses, result, rst: results, talk: resultsess})
                        })
                        .catch(err=> console.log(err));
                        })
                     .catch((err) => console.log(err))
                     }) 
                     .catch((err) => {console.log(err)})
            }
         })
         .catch(err => console.log(err))     
})

app.post('/message', (req,res) => {
    const {fromid, toid, mess, dater, timer} = req.body;

    const sendmesg = messages({
        fromid: fromid,
        toid: toid,
        mesg: mess,
        dater: dater,
        timer: timer,
        new: 'new'
    })

    sendmesg.save()
            .then((result) => {
                console.log('sent');
            })
            .catch(err => console.log('not sent' + err))
    })

app.get('/fetch-mesg', (req,res) => {
const userid = req.query.userid;
const chatid = req.query.chat;

                users.findById(chatid)
                        .then((resultses) => {
                messages.find({$or : [{fromid : userid,toid: chatid},{fromid: chatid, toid: userid}]}).sort({createdAt : 1})
                        .then((resultsess) => {
                            res.render('mess-update', {chatuser:resultses, talk: resultsess})
                        })
                        .catch(err => console.log(err));
                        })
                        .catch((err) => console.log(err))
}) 

app.get('/fetch-mesguser', (req,res) => {
    const userid = req.query.userids;
    const chatid = req.query.chats;

    users.findById(userid)
         .then((result) => {
            if(result !== null){
                users.find({_id : {$nin : result._id}})
                     .then((results) => {
                messages.find({fromid : chatid,toid: userid})
                        .then((resultsess) => {
                       res.render('messuser-update', {rst: results, result, tlk : resultsess});
                    })
                    .catch(err => console.log(err));
                    })
                     .catch((err) => {console.log(err)})
            }
         })
         .catch(err => console.log(err)) 
})



app.post('/upload-image', (req,res) => {
    const {glry} = req.body;
    console.log(glry);
})
 
app.get('/logout', (req,res) => {
    const userid = req.query.userid;
    req.session.destroy((err, result) => {
         if (err) throw err;
         res.redirect('/');
               })
})
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
app.use(express.static('public'));


//url extend url
app.use(express.urlencoded({extended: false}))

//listen to port
app.listen('3000', () => {
    console.log('Listening to port 3000')
})

app.get('/load', (req,res) => {
res.render('load')
})

app.get('/talk', (req,res) => {
    const iduser = req.query.d;
    console.log(iduser);

    const fetchqry = `SELECT * FROM users WHERE id = '${iduser}'`;
    conn.query(fetchqry, (error, resultes) => {
        if (error) throw error;
        const chatbuddy = `SELECT * FROM users WHERE id != '${iduser}'`;
        conn.query(chatbuddy, (error, result) => {
        if (error) throw error;
        res.render('talk',{rst:result, result: resultes});
        console.log(result); 
        })
        console.log(resultes);
    });
});
    
app.post('/talk', (req,res) => {
    const chatid = req.body.chat;
    const usersid = req.body.userid;
    console.log(chatid);
    console.log(usersid);

    const chatqry = `SELECT * FROM messages WHERE toid='${chatid}'`;
    conn.query(chatqry, (error,results) => {
        if (error) throw error;
        console.log(results);
        const fetchqry = `SELECT * FROM users WHERE id = '${usersid}'`;
        conn.query(fetchqry, (error, resultes) => {
        if (error) throw error;
        console.log(resultes);
        const fetchqrys = `SELECT * FROM users WHERE id = '${chatid}'`;
        conn.query(fetchqrys, (error, resultss) => {
        if (error) throw error;
        console.log(resultss);
        const fetchqryss = `SELECT * FROM users WHERE id != '${chatid}'`;
        conn.query(fetchqryss, (error, resultses) => {
        if (error) throw error;
        console.log(resultses);
        res.render('talk', {result: resultes, talk: results, chatuser: resultss, rst:resultses});
       });
       });
       });
       });

})

app.get('/', (req,res) => {
    if(req.session.view){
    console.log(req.session)
    res.render('index');
    }else{
        res.redirect('/login');
    }
})

app.get('/login', (req,res) => {
    res.render('login') ;
})

app.post('/login', (req,res) => {
    const {username , passcode} = req.body;

    const sql = `SELECT * FROM users WHERE username = '${username}' AND passcode = '${passcode}'`;
    conn.query(sql, (error, result) => {

        if(error) {
            console.log(error)
        };
        if(result.length > 0){
            const sqle = `SELECT * FROM users WHERE username != '${username}'`;
            conn.query(sqle, (errs, rst) =>{
                if (errs) throw errs;
                res.render('index', {result, rst});    
            })

            const updatestatus = `UPDATE users SET status = 'online' WHERE username = '${username}'`;
            conn.query(updatestatus, (error, results) =>{
               if (error) throw error;
               console.log(results + 'User is now online');
            })

        }else{
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
    const userid = req.query.userid;
    req.session.destroy((err, result) => {

        const updatests = `UPDATE users SET status = 'offline' WHERE id = '${userid}'`;
            conn.query(updatests, (error, results) =>{
               if (error) throw error;
               res.redirect('/')
               console.log(results + 'User is now offline')
            })
        console.log(result)
    })
})


app.post('/message', (req,res) => {
    let fromid = req.body.fromid;
    let toid = req.body.toid;
    let mess = req.body.mess;
    let dater = req.body.dater;
    let timer = req.body.timer;

    const sendmsg = `INSERT INTO messages(toid,fromid,mesg,time_stamp,date) VALUES('${toid}','${fromid}','${mess}','${timer}','${dater}')`;
    conn.query(sendmsg, (error,result) => {
        if (error) throw error;
        console.log('Message sent Successfully' + result);
    }) 
});

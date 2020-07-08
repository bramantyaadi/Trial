const http = require('http');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { addListener } = require('process');

const apps = express();
const server = http.createServer(apps);

apps.set('views',path.join(__dirname,'views'));
apps.set('view engine','hbs');
apps.use(express.static('public'));
apps.use(bodyParser.urlencoded({extended:false}));

// connection database
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'fai_uas'
});

conn.connect(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('CONNECT TO DATABSE');
    }
})

apps.get('/katalog' , function (req,res) {
    var sql = "SELECT * FROM PANTAUAN";
    var query = conn.query(sql , function(err , result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(JSON.stringify({"status": 200 , "error":null , "response":result}));
        }
    })
})

apps.post('/userlogin',function(req,res) {
    // var username = req.body.textusername;
    // var password = req.body.textpassword;
    var username = "jim";
    var password = 234;
    
    var sql = "SELECT * FROM DOKTER WHERE DOKTER_USERNAME='"+username+"' AND DOKTER_PASSWORD='"+password+"'";
    var query = conn.query(sql , function(err,results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(JSON.stringify({"status":200 , "error" : null , "response" : results}));
        }
    })
})

apps.get('/' , function(req , res) {
    res.render('index');
})

// apps.get('/:name' , function(req , res) {
//     res.render('index',{
//         name: req .params.name
//     });
// })

apps.get('/form',function(req, res) {
    res.render('form');
})

apps.post('/post',function(req,res) {
    res.render('index',{
        name:req.body.textname
    })
});



server.listen(8000 , function() {
    console.log('Server Running 8080');
})
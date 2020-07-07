const http = require('http');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
            res.render('katalog',{
                results:result
            })
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
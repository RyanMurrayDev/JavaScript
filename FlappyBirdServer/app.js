let port = 4444;
let express = require("express");
let bcrypt = require("bcryptjs");
let bodyParser = require("body-parser");
let path = require("path");
let saltRounds = 10;
let password = "";
let app = express();
const mysql = require("mysql");
let cors = require('cors');

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(express.urlencoded());

let options = {
    host: "localhost",
    port: 3306,
    user: "root",
    //password: "dennisiscool",
    password: "D3nn|s|sC00l",
    database: "flappy_bird"
};

let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    //password:"dennisiscool",
    password: "D3nn|s|sC00l",
    database: "flappy_bird"
});


app.post("/admin/login", async function (req, res, next) {
    let query = "select * from admin";
    let adminUser;
    let hashedPass;
    await con.query(query, function (err, result) {
        if (err) res.json({"status": "Error", "message": "Failed to retrieve admins"});
        adminUser = result[0].admin_username;
        hashedPass = result[0].admin_password;
        console.log(req.body.username);
        console.log(adminUser);
        console.log(hashedPass);
        if (req.body.username == adminUser) {
            bcrypt.compare(req.body.password, hashedPass, function (err, match) {
                if (match) {
                    res.send("success");
                } else {
                    res.send("Username or Password incorrect");
                }
            });
        } else {
            res.send("Submission failed try again ");
        }
    });
});

//insert high score
app.post("/newscore", function (req, res, next) {
    let data = JSON.parse(req.body.data);
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var sql = "INSERT INTO scores (username, score) VALUES (?,?) ";
        let values = [data[i].username, data[i].score];
        con.query(sql, values, function (err) {
            if (err) throw err;
            console.log("Successful Insert");
        });
    }
});


//get high scores by username limit 10
app.get("/scores/:username", function(req, res, next){
    let query = "select * from scores where username = '" + req.params.username + "' order by score desc limit 10";
    con.query(query,function(err,result,fields){
        if(err) res.json({"status":"404 error","message":"failed to retrive"});
        //console.log("Results");
        res.json(result);
    });
});

//get all high scores limit 10
app.get("/scores", function(req, res, next){
    let query = "select * from scores order by score desc limit 10";
    con.query(query,function(err,result,fields){
        if(err) res.json({"status":"404 error","message":"failed to retrive"});
        //console.log(result);
        res.json(result);
    });
});

//inserting high score
app.get("/insert/:username/:score", function(req, res, next){
        let query = "insert into scores (username, score) VALUES (?)";
        let values = [req.params.username,req.params.score];
        con.query(query,[values], function(err,result){
            if(err) res.send("Insert Failed");
            //console.log("Number of records inserted: " + result.affectedRows);
            res.send("Score inserted");
        });
});

//register to make new admin user
app.get("/register/:username/:password", function(req, res, next){
    //let formdata = req.body;
    //console.log(formdata);
   bcrypt.hash(req.params.password, saltRounds, function(err,hash){
       let query = "select * from admin";
       console.log(req.params.username + ", " + password);
       let values = [req.params.username,password];
       con.query(query,[values], function(err,result){
           if(err) res.send("Username already taken");
           //console.log(result.length);
           for(let i = 0; i < result.length; i++ ){
               //console.log(result[i].admin_username);
               if(result[i].admin_username == req.params.username){
                   console.log("username already taken");
                   res.send("Sorry username already taken");
                   break;
               }
               else{
                   //console.log("password: " + hash);
                   password = hash;
                   query = "insert into admin (admin_username,admin_password) VALUES (?)";
                   //console.log(req.params.username + ", " + password);
                   values = [req.params.username,password];
                   con.query(query,[values], function(err,result){
                       if(err) res.send("Username already taken");
                       res.send("Registered Successfully");
                   });
               }
           }
       });
    });
});

//login
app.get("/login/:username/:password", function(req, res, next){
    //let formdata = req.body;
        let query = "select admin_password from admin where admin_username=? limit 1";
        //console.log(req.params.username);
        let values = [req.params.username];
        con.query(query,[values], function(err,result){
            //console.log(result[0]);
            if(err) res.json({"status":"404 error","message":"failed to retrive"});
            if(result[0]===undefined) res.send("Username or Password incorrect");
            //console.log("Number of records inserted: " + result.affectedRows);
            if(result[0]!=undefined){
            bcrypt.compare(req.params.password, result[0].admin_password,function(err,match){
                //console.log("password match: " + match);
                if(match)
                {
                    res.send("success");
                }
                else
                {
                    res.send("Username or Password incorrect");
                }
            });
            }
        });
});

app.get("*", function(req,res){
    res.send("Type in username to insert score");
});

app.listen(port,()=> console.log("App listening on port ", port));
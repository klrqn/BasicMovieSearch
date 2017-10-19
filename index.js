var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// var bodyParser = require("body-parser"); -- this is used for url parameters i.e. reddid.com/r/:id/:comment
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("search");
})


app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        res.render("results", {data: data});
        }
    });
});

// app.get("*", function(req, res){
//     res.send("404 not found");
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server running");
});

// General Search
// http://www.omdbapi.com/?s=guardians+of+the_galaxy&apikey=thewdb
// apikey=thewdb
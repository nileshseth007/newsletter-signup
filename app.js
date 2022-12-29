const express = require("express");
const parser = require("body-parser");
const request = require("request");
const https= require("https");

const app = express();
app.use(express.static("public"));
app.use(parser.urlencoded({extended : true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email= req.body.email;

    const data ={
        members :[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const JSONdata= JSON.stringify(data);

    const url="https://us14.api.mailchimp.com/3.0//lists/879cd7319e";

    const options={
        method: "POST",
        auth: "Nilesh007:0cac0daeed027263e1a9611a46d70fcd-us14"
    }

    const request= https.request(url,options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    // request.write(JSONdata);
    request.end();
    
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

//API Key
//0cac0daeed027263e1a9611a46d70fcd-us14

//audience id
// 879cd7319e
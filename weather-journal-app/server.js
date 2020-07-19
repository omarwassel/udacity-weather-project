// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express=require("express");

// Start up an instance of app
const app=express();

// deppendances
const bodyParser=require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=8081;
const server=app.listen(port,()=>{
    console.log("serer is running ....");
    console.log(`at localhost ${port}`);
});

//post route to store data in projectData end-point
app.post("/storeData",(req,res)=>{
        let data=req.body;
        projectData={"date":data.date , "temp":data.temp ,"content":data.content};
        res.send("data stored successfully")
        console.log(`projectData: ${projectData}`);
    }
);
//get route to get data from projectData end-point
app.get("/getData",(req,res)=>{
    let str=JSON.stringify(projectData);
    console.log(`str: ${str}`);
    res.send(str);
    }
);



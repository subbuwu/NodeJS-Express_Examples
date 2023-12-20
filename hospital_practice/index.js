const bodyParser = require("body-parser");
const express = require("express");
const port = 3000;
const app = express();

let users = 
[{
    name:"Subbu",
    kidneys:[
        {healthy:false},
        {healthy:false},
        {healthy:true},
    ]
}]

//middlewarers
app.use(express.json());

app.get("/",(req,res)=>{
    const userKidneys = users[0].kidneys;
    const numberOfKidneys = userKidneys.length;
    //4
    const healthyKidneys = userKidneys.filter((kidney)=>kidney.healthy === true).length;
    const unhealthyKidneys = numberOfKidneys - healthyKidneys;
    res.json({numberOfKidneys,healthyKidneys,unhealthyKidneys});
})

app.post("/",(req,res)=>{
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({healthy:isHealthy});
    res.json({
        message : "Done!"
    })
    console.log(users[0].kidneys);
})

app.put("/",(req,res)=>{
    let kidneys = users[0].kidneys;
    kidneys = kidneys.map((kidney)=>(
        kidney.healthy = true
    ));
    res.send("Updated");
})

app.delete("/",(req,res)=>{
    let kidneys = users[0].kidneys;
    console.log(kidneys);
    kidneys = kidneys.filter((kidney)=>(kidney.healthy === true));
    res.send("Unhealthy kidneys deleted");
})

app.listen(port,()=>console.log(`Server listening on port ${port}`));
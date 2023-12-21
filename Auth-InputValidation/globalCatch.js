const express = require("express");
const port = 3000;
const app = express();

app.use(express.json());

app.post("/health",(req,res)=>{
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    res.send("Healthy !!");
})

app.listen(port,()=>console.log(`Server listening on port ${port}`));

app.use((err,req,res,next)=>{
    res.json({
        message : "Server crashed !"
    })
})
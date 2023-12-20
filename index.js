const express = require("express");
const port = 3000;
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/calculate",(req,res)=>{
    res.send("<h3>Calculate</h3>")
})

app.post("/calculate",(req,res)=>{
    const n = req.query.n;
    const message = req.body.message;
    res.send(`n * 2 = ${n*2}`);
})

app.listen(port,()=>console.log(`Server listening on port ${port}`))
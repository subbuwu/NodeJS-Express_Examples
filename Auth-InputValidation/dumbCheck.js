const express = require("express");
const port = 3000;
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;
    //Mock Auth && Input validation
    if(kidneyId != 1 && kidneyId != 2){
        res.send("Something wrong with the inputs");
        return;
    }
    if(username != "subbu" && password != "123"){
        res.send("Wrong username or password");
        return;
    }
    //Validation Checked
    res.send("Logged in");
})

app.listen(port,()=>console.log(`Server listening on port ${port}`));
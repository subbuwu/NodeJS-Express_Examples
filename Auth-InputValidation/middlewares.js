const express = require("express");
const port = 3000;
const app = express();

app.use(express.json());

const userMiddleware = (req,res,next) => {
    const username = req.headers.username;
    const password = req.headers.password;

    if(username!="Subbu" && password!="123"){
        res.send("Username or Password wrong");
        return;
    } else {
        next();
    }
}

const kidneyMiddleware = (req,res,next) => {
    const kidneyId = req.query.kidneyId;

    if(kidneyId!=1 && kidneyId!=2){
        res.json({
            message:`Expected 1 || 2 , received ${kidneyId}`
        })
        return;
    } else {
        next();
    }
}

app.get("/",userMiddleware,kidneyMiddleware,(req,res)=>{
    res.send("Healthy !!");
})



app.listen(port,()=>console.log(`Server listening on port ${port}`));

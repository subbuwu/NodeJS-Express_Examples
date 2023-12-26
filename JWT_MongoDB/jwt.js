const express = require("express");
require('dotenv').config();
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;
const mongoose = require('mongoose');
let jwtPassword = "$$$"
app.use(express.json());

console.log(process.env.MONGO_DB_URL);

mongoose.connect(process.env.MONGO_DB_URL)
const User = mongoose.model('User', { name: String , email: String, password: String});



app.post("/signup",async (req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    const exisitingUser =  await User.findOne({ email });
    if(exisitingUser){
        res.send("User Exists");
        return;
    } else {
        const user = new User({ 
            name, 
            email, 
            password,
        });
        user.save();
        res.json({
            message : "User Created Successfully",
        })
    }
})

app.use(express.json());


app.listen(port,()=>console.log(`Server listening on port ${port}`));
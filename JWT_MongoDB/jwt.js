const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;
const mongoose = require('mongoose');
let jwtPassword = "$$$"
app.use(express.json());

mongoose.connect('mongodb+srv://sn0122:1nnvzex72EuSuDFi@cluster0.2q9n9ej.mongodb.net/usersappnew');
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
const express = require("express")
const port = 3000;
const zod = require("zod");
const app = express();

const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal("IN").or(zod.literal("US")),
})

app.use(express.json());

const inputValidation = (req,res,next) => {
    const obj = req.body.obj;
    const response = schema.safeParse(obj);
    console.log(response)
    if(!response.success){
        res.json({
            msg:"Error"
        })
    } else {
        next()
    }
}

app.post("/",inputValidation,(req,res)=>{
    console.log("Passed Middleware");
})

app.listen(port,()=>console.log(`Server listening on port ${port}`));
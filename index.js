const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 8000
const bodyparser = require('body-parser')
const userRouter = require('./routes/user.route')

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.get("/",(req,res)=>{

    res.render("register.ejs")

})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

mongoose.connect(process.env.dburl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(data=>{
console.log("Database connected")
}).catch((err)=>{
    console.log(err.message)
})

app.use('/api/v1/user',userRouter);

app.listen(port,()=>{
    console.log(port)
})


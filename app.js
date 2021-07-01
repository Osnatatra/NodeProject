const express= require('express')
const bodyparser = require('body-parser')
const app= express()
const jwt = require('jsonwebtoken')
const dotenv= require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const router = require('./router.js')
var nodemailer = require('nodemailer');
app.use(bodyparser.json())
app.use('/',router)

// app.use(bodyparser.urlencoded({extended: true}))
const request=require('request')
// app.get('/sign/:name/:password',(req,res)=>
// {
// const token= jwt.sign({name:req.params.name,password:req.params.password},'123abc')
//             res.send(token)
// })

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECT, connectionParams)
.then(()=>console.log('conected mongoose'))
.catch((erorr)=>console.log('the conecction faild: ', erorr))

app.listen(3000,()=>console.log('listening to port 3000'))
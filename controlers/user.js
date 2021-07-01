const User = require('../models/user.js')
const Wether = require('../models/wether')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const request = require('request')
const {sendMail} = require('../controlers/email')
const {findByIdAndDelete} = require('../models/user.js')


const createUser = async (req, res) => {

    console.log("req.body", req.body.userName)
    let currentUser = new User(req.body)
    const token = jwt.sign({
        name: currentUser.userName,
        password: currentUser.password
    },
    process.env.ABC)
    currentUser.jwt = token;

    try {
        await currentUser.save()
        console.log('user saved ', currentUser)
        sendMail(currentUser.email)
        res.status(200).json({
            User: currentUser
        })
    } 
    catch (error) {
        res.json({status: 400, message: error})
        console.log('cannot saved user', error);
    }
}

let getAllUsers = async (req, res) => {
    console.log("getAllUsers..")
    try {
        let users = await User.find()
        res.json(users)
    } 
    catch (error) {
        res.json(error)
    }
}



module.exports = {
    createUser,
    getAllUsers,
    
}
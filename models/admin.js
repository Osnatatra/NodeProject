const mongoose = require("mongoose")
const user =require('../models/user')
const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 10
    }
    ,
    email: {
        type: String
    },
    jwt:{
        type:String
    },
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]
})
module.exports = mongoose.model('admin',adminSchema)
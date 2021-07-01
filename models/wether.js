const mongoose = require("mongoose")
const user =require('../models/user')

const wetherSchema = mongoose.Schema({
   city: {
        type: String,
    },
    temp:{
        type:String
    },
    date:{
        type:Date
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
})
module.exports = mongoose.model('wether',wetherSchema)
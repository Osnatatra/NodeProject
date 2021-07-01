const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
        // unique: true,
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
    wethers:[{type:mongoose.Schema.Types.ObjectId,ref:'wether'}],
    adnin:{type:mongoose.Schema.Types.ObjectId,ref:'admin'}
})
module.exports = mongoose.model('user',userSchema)
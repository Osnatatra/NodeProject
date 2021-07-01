const user = require('../models/user')
const Wether = require('../models/wether')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const WetherC = require('../controlers/wether')

const createAdmin = async (req, res) => {

    console.log("req.body", req.body.adminName)
    let currentAdmin = new Admin(req.body)
    const token = jwt.sign(currentAdmin._id,process.env.ABC)
    currentAdmin.jwt = token;

    try {
        await currentAdmin.save()
        console.log('Admin saved ', currentAdmin)
        res.status(200).json({
            Admin: currentAdmin
        })
    } 
    catch (error) {
        res.json({status: 400, message: error})
        console.log('cannot saved Admin', error);
    }
}



const deleteUser = async (req, res) => {
    let userId = req.params.userId
    await user.findByIdAndDelete(userId, (error, user) => {
        if (error)
            res.send(error)
        else {
            if (user) {
                console.log('deleted user..');
                console.log(user.wethers);
                try { 
                    user.wethers.map(async wether => {
                    console.log('wether:', wether._id);
                    await Wether.findByIdAndDelete(wether._id)
                    // WetherC.deleteWeather(wether._id)
                    console.log('deleted wether..', wether._id);
                                 
                
                })
                res.json(user)
            }
            catch{
                console.log('cannot find wether..' ,error);
            }
            } 
            else {
                res.send('cannot find user: ',userId)
            }
        }
    })
}
module.exports=
{
    deleteUser,
    createAdmin
}
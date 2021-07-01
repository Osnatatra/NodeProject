const router= require('express').Router()
const user=require('./controlers/user')
const weather=require('./controlers/wether')
const admin=require('./controlers/admin')

router.post('/createUser1',user.createUser)
router.post('/getWether/:cityName/:_id',weather.createWeather)
router.get('/getAllUsers',user.getAllUsers)
router.get('/getAllWeathers',weather.getAllWeathers)
router.get('/deleteUser/:userId',admin.deleteUser)
router.get('/createAdmin',admin.createAdmin)
router.get('/deleteWeather/:_id',weather.deleteWeather)

module.exports=router
const Wether = require('../models/wether')
const User = require('../models/user')
const request=require('request')
const {json} = require('body-parser')
const jwt = require('jsonwebtoken')
const { findById } = require('../models/user')
const wether = require('../models/wether')

// const getWether = async (req, res) => {
//     console.log(req.params.cityName);
// let decoded= jwt.verify(req.headers.authorization,process.env.ABC)
// try {
//     let user=await User.findById(decoded)
//     if (user){

//     const requestApiwether = (req.params.cityName) => {
       
//         return new Promise((resolve, reject) => {
//             console.log(`request..${city}`)
//             let options = {
//                 method: 'GET',
//                 url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=991da08d765b3d3e160028601c3e4cfb`
//             }
//             request(options, (error, response, body) => {
//                 if (error) {
//                     reject(error)
//                     console.log('error..',error)
//                 } 
//                 else {
//                     resolve(body)
//                     console.log('body..', body)
//                 }
//             })
//         })
//     }

//      }
//     requestApiwether(req.params.cityName)
//         .then((data) => {
//             console.log('data..',data)
//             let weatherDitails = JSON.parse(data)
//             try {
//                 let newWeather = new Wether({
//                     city: weatherDitails['name'],
//                     temp: weatherDitails['main']['temp'],
//                     user: req.params.id
//                 })
               
//                 newWeather.save()
//                 .then(updateUser(req.params.id,newWeather._id))
//                 .then((wether)=>(res.send({wether})))
//                 .catch((err)=>{console.log('err:',err);})
    
//             } catch (error) {
//                 console.log('error!..',error);
//             }
//         })
//     }
//  catch (error) {
    
// }
// }
const createWeather = async (req, res) => {
    // let decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    // console.log(decoded);
    try {
        let user = await User.findById(req.params._id)
        console.log(user);
        if (user) {
            const options = {
                method: "GET",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&units=metric&lang=he&appid=c740a66fd3bc2a61a07bbe7ce8b8a52d`
            }

            request(options, async function (err, response, body) {
                if (err) {
                    res.status(500).json({ error: error });
                    console.log('hi');
                }
                else {
                    console.log(JSON.parse(body));

                    let newWeather = new Wether({
                        date: new Date,
                        city: req.params.cityName,
                        temp: JSON.parse(body).main.temp,
                        user: user._id
                    });
                    await newWeather.save();
                    user.wethers.push(newWeather);
                    await user.save();
                    res.status(200).send(newWeather)
                }
            })
            // .populate('userId')
        }
        else res.status(200).send('This user is not found');
    }
    catch (error) {
        console.log('hello');
        res.status(400).json({ error: error });
    }
}



let getAllWeathers = async (req, res) => {
    console.log("getAllWeathers..")
    try {
        let weathers = await Wether.find()
        res.json(weathers)
    } 
    catch (error) {
        res.json(error)
    }
}
let deleteWeather= async(req, res)=>{
    console.log(req.params._id);
    try{
        await Wether.findByIdAndDelete(req.params._id)
        console.log('wether deleted...');
        res.json(wether)
    }
    catch{
        res.send(error)
        console.log(error);
    }
}
module.exports = {
    // getWether,
    deleteWeather,
    createWeather,
    getAllWeathers
}
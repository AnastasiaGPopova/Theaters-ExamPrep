const User = require('../models/User.js')
const jwt = require('../lib/jsonwebtoken.js')
const config = require('../configurations/configPorts')


exports.getUserByUsername =  (username) => User.findOne({username})

exports.register = async (username, password) => {

   const newUser = await User.create({username, password})

   const payLoad = {_id: newUser._id, username: newUser.username}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token

} 

exports.login = async (existingUser, password) => {
   const isValid = await existingUser.validatePassword(password)

   if(!isValid){
      throw new Error("Invalid username or password!")
   }
  
   const payLoad = {_id: existingUser._id, username: existingUser.username}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token
}

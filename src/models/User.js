const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already taken!"],
        match: [/^[A-Za-z0-9]*$/,"Username should be only english letters and digits"],
        minLength: [3, "Username should be at least 3 characters long!"]
    },
    password : {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]*$/,"Password should be only english letters and digits"],
        minLength: [4, 'Password too short!']
    },
    // likedPlays: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Play'
    // }]
 })

 userSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next()
    }
    bcrypt.hash(this.password, 10)
           .then(hash => {
            this.password = hash
            next()
           })
 })

 userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password) //this.password is the encrypted password. Password is the password that the user is giving
    
})

 const User = mongoose.model('User', userSchema)
 module.exports = User
const mongoose = require('mongoose')

const playSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Title must be unique!"]
        //minLength: [6, "Too short! Title should be at least 6 characters !"]
    }, 
    description: {
        type: String,
        required: true,
        //enum: { values:["Apartment", "Villa", "House"], message:'Type field can be only “Apartment”, “Villa” or “House” !'}
        maxLength: [50, "Too long! Keyword should be max 50 characters !"]
    },
    imageUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }
    }, 
    isPublic: {
        type: Boolean,
        default: false,
    },
    usersLiked:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
    // createdAt: {
    //     type: Date, default: Date.now
    // },
}, { timestamps: true })

const Play = mongoose.model('Play', playSchema)
module.exports = Play
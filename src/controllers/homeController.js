//const Post = require('../models/Post.js')
const User = require('../models/User')
const { all } = require('../routes')
const playService = require('../services/playService')


exports.getHomePage = async (req, res) => {
        let isFiltered = false
        if(req.user){
        const allPlaysDesOrder = await playService.getLastAdded().lean()
        const allPublicHome = allPlaysDesOrder.filter(x => x.isPublic == true)
         res.render('user-home', {allPublicHome, isFiltered})

        } else {
        let allPlaysbyLikes = await playService.getSortedByLikes().lean()
        const filter = allPlaysbyLikes.filter(x => x.isPublic == true)
        const top3Plays = filter.slice(0,3)
         res.render('guest-home', {top3Plays, isFiltered})
        }
        
}


// exports.getCatalogPage = async (req, res) => {
//         const allHouses = await housingService.getAllHouses().lean()
//         res.render('aprt-for-recent', {allHouses})
// }
// exports.getProfilePage = async (req,res) => {
//     const currentUser = await User.findById(req.user._id).lean()
//     const bookedHotels = await Hotel.find({bookedByUsers: req.user._id}).lean()
//     const hotels = bookedHotels.map(h => h.name)

//     res.render('auth/profile', { currentUser, hotels })

// }

// exports.getAboutPage = (req,res) => {
//     res.render('about')
// }

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}
const Play = require('../models/Play.js')
exports.isPlayOwner = (user, play) => {
    let isOwner = false
    if(user){
        if(user._id == play.owner._id){
            isOwner = true
        }
    }
   return isOwner
}


/////CHANGE!
exports.isAlreadyLiked = async (userId, playId) => {
    let isRentedAlready = false
    const play = await Play.findById(playId)
    //TO DO
    const rented = play.usersLiked.find(x=> x == userId )

    if(rented){
        isRentedAlready = true
    }
    return isRentedAlready
}
const Play = require('../models/Play.js')
const User = require('../models/User')
const playService = require('../services/playService')
const playUtility = require('../utils/playUtility')
const parser = require('../utils/parser')



exports.getPlayCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedPlay = async (req, res) => {
 const {title, description, imageUrl, isON} = req.body

 let isPublic = false
 if(isON == "on"){
    isPublic = true
 }
 

    try{
        if(!title || !description || !imageUrl){
            throw new Error ("All fields are requiered!")
        }
        const newPlay = await playService.createNewPlay({title, description, imageUrl, isPublic, owner: req.user._id})//encoded body-to, which we receive, will create a new cube
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors})
    }

}

exports.getDetails = async (req, res) => {

    let currentPlay = await playService.getOnePlay(req.params.playId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                       .populate('usersLiked') 
                                       .populate('owner')         
                                       .lean()

     if(!currentPlay){
    return res.redirect('/404')
      }

let isLogged = false
      

if(req.user){
    isLogged = true

    const isOwner = playUtility.isPlayOwner(req.user, currentPlay)
    const isAlreadyLiked= await playUtility.isAlreadyLiked(req.user._id, req.params.playId)
    console.log(isOwner)
    console.log(isAlreadyLiked)

    res.render('details', {currentPlay, isOwner, isAlreadyLiked, isLogged})
} else {
    res.render('details', {currentPlay})
}
}

exports.like = async (req,res) =>{
    const currentPlay = await playService.getOnePlay(req.params.playId)
    const isOwner = playUtility.isPlayOwner(req.user, currentPlay)

    if(isOwner){
        res.redirect('/')
    } else {
    currentPlay.usersLiked.push(req.user._id)
    await currentPlay.save()
    res.redirect(`/${req.params.playId}/details`)
    }

}


exports.getEditPage = async (req,res) => {
    const currentPlay = await playService.getOnePlay(req.params.playId).populate('owner').lean()
    const isOwner = playUtility.isPlayOwner(req.user, currentPlay)

    if(!isOwner){
        res.redirect('/')
    } else {
        res.render('edit', {currentPlay})
    }
}



exports.postEditedPlay = async (req,res) => {
    const {title, description, imageUrl, isON} = req.body

    let isPublic = false
    if(isON == "on"){
       isPublic = true
    }
    
       try{
           if(!title || !description || !imageUrl){
               throw new Error ("All fields are requiered!")
           }
        const updatedPlay = await playService.update(req.params.playId, {title, description, imageUrl, isPublic} )//encoded body-to, which we receive, will create a new cube

        console.log(updatedPlay)
        res.redirect(`/${req.params.playId}/details`)

    } catch(error){
        const errors = parser.parseError(error)
        res.render(`edit`, {errors})
    }
}


exports.getDeletePlay= async (req, res) => {
    const play = await playService.getOnePlay(req.params.playId).populate('owner').lean()
    const isOwner = playUtility.isPlayOwner(req.user, play)

    if(!isOwner){
        res.redirect('/')
    } else {
   const test = await playService.deletePlay(req.params.playId)
   res.redirect('/')
    }
}

exports.getSortedByDate = async (req,res) => {
    const allPostsByDate = await playService.getLastAdded().lean()
    let isFiltered = true
    let filteredByDate = true
    res.render('user-home', {allPostsByDate, isFiltered, filteredByDate})
}

exports.getSortedByLikes = async (req,res) => {
    const allPostsByLikes = await playService.getSortedByLikes().lean()
    let isFiltered = true
    let filteredByLikes = true
    res.render('user-home', {allPostsByLikes, isFiltered, filteredByLikes})
}


// exports.getSearchPage = async (req,res) => {

//     let isSearched = false
//     res.render('search', {isSearched})
// }

// exports.getSearchPagewithResults = async (req, res) => {
//     let isSearched = true
//     const {searchedItem} = req.body

//     const allMatches = await housingService.getSearchedbyType(searchedItem).lean()
//     console.log(allMatches)


//     res.render('search', {allMatches, isSearched})
// }
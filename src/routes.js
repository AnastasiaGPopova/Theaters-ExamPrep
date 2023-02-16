//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const playController = require('./controllers/playController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------


router.get('/', homeController.getHomePage)
// router.get('/calalog', homeController.getCatalogPage)


//Login and Register

router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


// //play creation
router.get('/create', isAuthenticated, playController.getPlayCreationPage )
router.post('/create', isAuthenticated, playController.postCreatedPlay)

//Details Page
router.get('/:playId/details', playController.getDetails)

//like
router.get('/:playId/like', isAuthenticated, playController.like)
// // router.get('/post/:postId/voteDown', isAuthenticated, postController.voteDown)

//Edit page
router.get('/:playId/edit', isAuthenticated, playController.getEditPage)
router.post('/:playId/edit', isAuthenticated, playController.postEditedPlay)

//Delete post
router.get('/:playId/delete', isAuthenticated, playController.getDeletePlay)

 ///sortByDate
router.get('/sortByDate', isAuthenticated, playController.getSortedByDate)
router.get('/sortByLikes', isAuthenticated, playController.getSortedByLikes)



router.get('/logout', authController.logout)
// router.get('*', homeController.getErrorPage404)
// router.get('/404', homeController.getErrorPage404)



module.exports = router
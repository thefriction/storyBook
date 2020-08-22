const express = require('express')
const passport = require('passport')
const router = express.Router()

//Authenticate with Google !
//@route GET /
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//Dashboard Page
//@route GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect:'/'}),
    (req,res)=>{
        res.redirect('/dashboard')
    }
)

//Logout page
//@route GET /auth/logout
router.get('/logout',(req,res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router 
const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest} = require('../middleware/auth')

//include Story model
const Story = require('../models/Story')
//Login/Landing Page
//@route GET /
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})
//Dashboard Page
//@route GET /
router.get('/dashboard',ensureAuth,async(req,res)=>{

    try{
        const stories = await Story.find({user:req.user.id}).lean() //converts object from mongoose object to pure js so we can pass it to hbs
        res.render(`dashboard`,{
            name : req.user.firstName,
            stories,
        })
    }
    catch(err){
        console.log(err)  
        res.render(`./error/error`,{
            error : err,
        })      
    }

    
})

module.exports = router 
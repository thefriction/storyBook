const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    status: {
        type:String,
        default: 'public',
        enum : ['public', 'private']
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User' ,//take id from User model
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
module.exports = mongoose.model('Story', StorySchema)



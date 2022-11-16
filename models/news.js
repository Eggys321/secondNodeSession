const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Lets create a new Schema

const newSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },

},{timestamps:true})

const News = mongoose.model('New',newSchema)

module.exports = News
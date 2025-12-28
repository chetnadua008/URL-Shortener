const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema({
    short_ID:{
        type:String,
        required: true,
        unique: true,        
    },
    original_Url:{
        type:String,
        required:true,
    },
    click_History:[
        Number
    ]
},{
    timestamps:true
})

const URL = mongoose.model('url',urlSchema);

module.exports = URL;
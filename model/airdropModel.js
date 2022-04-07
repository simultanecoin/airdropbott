const mongoose = require('mongoose')

const s = new mongoose.Schema({
    userId : {
        type: Number
    },
    username: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    twitter: {
        type: String
    },
    tg_username: {
        type: String
    },
    wallet: {
        type: String
    },
    balance: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
    
}, {versionKey: false})

module.exports = mongoose.model('airdrop_user_list',s)
const mongoose = require('mongoose')

const s = new mongoose.Schema({
    userId: {
        type: String
    },
    tg_name: {
        type: String
    },
    channel_url: {
        type: String
    },
    sub_count: {
        type: String
    },
    email: {
        type: String
    },
    tg_address: {
        type: String
    },
    promotional_fee:{
        type: String
    },
    smlt_payment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
},{versionKey: false})

module.exports = mongoose.model('marketing_user_list',s)
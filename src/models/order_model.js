const mongoose = require('mongoose')

orderSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    costEstimate: {
        type: String,
        trim: true
    },
    deliveryEstimate: {
        type: String,
        trim: true
    },
    deliveryDate: {
        type: String,
        trim: true
    },
    baseCADOption:{
        type: Number,
        trim: true
    },
    flightAddOn: {
        type: Boolean,
        trim: true
    },
    kml: {
        type: String,
        trim: true
    },
    tif: {
        type: String,
        trim: true
    },
    las: {
        type: String,
        trim: true
    },
    acreage: {
        type: String,
        trim: true
    },
    orderStatus: {
        type: Number,
        trim: true
    },
    orderDate : {
        type: Date,
        default: Date.now(),
        trim: true
    },
    orthoFile: {
        type: String,
        trim: true
    },
    thumbnail: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    ownerProject: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Tasks'
    }
}, {
    timestamps: true
})

const Order_model = mongoose.model('Orders', orderSchema)

module.exports = Order_model


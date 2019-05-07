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
    }
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Tasks'
    // }
}, {
    timestamps: true
})

const Order_model = mongoose.model('Orders', orderSchema)

module.exports = Order_model

//projectID(string, required) #TBD
// userID(string, required)
// acreage(string, required)
// costEstimate(string, required)
// deliveryEstimate(string, required)
// baseCADOption(number, required)
// flightAddOn(boolean, required)
// kml(string, required)

//
// projectID(string) #TBD
// acreage(string)
// costEstimate(string)
// deliveryEstimate(string)
// deliveryDate(string)
// baseCADOption(number)
// flightAddOn(boolean)
// kml(string)
// orderStatus(number)
// orderDate(date, utc)
// cadFile(string)
// orthoFile(string)
// thumbnail(string)
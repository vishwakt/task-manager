const mongoose = require('mongoose')

taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {

    timestamps: true
})

taskSchema.virtual('orders', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'ownerProject'
})

const Task_model = mongoose.model('Tasks', taskSchema)

module.exports = Task_model
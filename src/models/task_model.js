const mongoose = require('mongoose')

const Task_model = mongoose.model('Task_model', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task_model
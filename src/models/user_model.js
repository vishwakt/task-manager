const mongoose = require('mongoose')
const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: false,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Mobile phone number invalid')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    company: {
        type: String,
        required: false,
        trim: true
    },
    jobTitle: {
        type: String,
        required: false,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    stripeID: {
        type: String,
        required: false,
        trim: true
    },
    // address: {
    //     streetAddress: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     addressLine2: {
    //         type: String,
    //         default: '',
    //         required: false,
    //         trim: true
    //     },
    //     city: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     state: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     zipCode: {
    //         type: String,
    //         required: true,
    //         trim: true,
    //         validate(value) {
    //             if (!validator.isPostalCode(value, 'any')) {
    //                 throw new Error('Invalid Postal code')
    //             }
    //         }
    //     },
    //     country: {
    //         type: String,
    //         required: false,
    //         trim: true
    //     },
    // },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.plugin(uniqueValidator)

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

/**
 * Hash the plaintext password before saving
 **/
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User
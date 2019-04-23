const jwt = require('jsonwebtoken')
const User = require('../models/user_model')

const auth = async (req, res, next) => {
    console.log("Look who's here")
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'thisisasecret')
        const user = await User.findById({ _id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error()
        }
        req.user = user

        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate'})
    }
}

module.exports = auth
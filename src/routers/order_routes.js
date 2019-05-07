const express = require('express')
const Order = require('../models/order_model')
const auth = require('../middleware/auth')
const router = new express.Router()

/**
 * * POST method to create an order
 */
router.post('/orders', auth, async (req, res) => {
    const order = new Order(req.body)

    // const order = new Order({
    //     ...req.body,
    //     owner: req.user._id
    // })
    try {
        await order.save()
        // console.log(req.user._id)
        res.status(201).send(order)
    } catch (e) {
        // console.log(req.user._id)
        res.status(400).send(e)
    }
})

/**
 * * GET method to view all orders
 */
router.get('/orders', auth, async (req, res) => {
    const match = {}
    // const sort = {}

    // if (req.query.completed) {
    //     match.completed = req.query.completed === 'true'
    // }

    // if (req.query.sort) {
    //     const parts = req.query.sort.split(':')
    //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    // }

    const orders = await Order.find()
    try {
        // await req.user.populate({
        //     path: 'orders',
        //     match,
        //     options: {
        //         limit: parseInt(req.query.limit),
        //         skip: parseInt(req.query.skip)
        //         // sort
        //     }
        // }).execPopulate()
        // // const tasks = await Task.find({owner: req.user._id})
        res.send(orders)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router
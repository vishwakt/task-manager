const express = require('express')
const Order = require('../models/order_model')
const auth = require('../middleware/auth')
const router = new express.Router()

/**
 * * POST method to create an order
 */
router.post('/orders', auth, async (req, res) => {
    // const order = new Order(req.body)

    const order = new Order({
        ...req.body,
        owner: req.user._id
    })
    try {
        // console.log(req.task._id)
        await order.save()
        // console.log(req.user._id)
        res.status(201).send(order)
    } catch (e) {
        console.log(req.user)
        console.log(req.user._id)
        res.status(400).send(e)
    }
})

/**
 * * GET method to view all orders
 */
router.get('/orders', auth, async (req, res) => {


    const orders = await Order.find({owner: req.user._id })
    try {
        res.send(orders)
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * * GET method to view all orders for a given project
 */
router.get('/orders/:id', auth, async (req, res) => {
    const _id = req.params.id

    const orders = await Order.find({ownerProject: _id, owner: req.user._id })
    try {
        res.send(orders)
    } catch (e) {
        res.status(500).send(e)
    }
})

/**
 * * GET method to view a single order
 */
router.get('/orders/:id', auth, async (req, res) => {
    const _id = req.params.id

    const order = await Order.findOne({ _id, owner: req.user._id })
    // const order = await Order.findOne({ _id})
    try {

        if (!order) {
            return res.status(404).send()
        }

        res.send(order)
    } catch (e) {
        res.status(500).send()
    }

})

/**
 * * PATCH method to update a single Order
 */
router.patch('/projects/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    // const allowedUpdates = ['description', 'completed']
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    //
    // if (!isValidOperation) {
    //     return res.status(400).send({ error: 'Invalid updates!' })
    // }

    try {
        const order = await Order.findOne({ _id: req.params.id, owner: req.user._id})
        // const task = await Task.findById(req.params.id)
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!order) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            order[update] = req.body[update]
        })

        await order.save()

        res.send(order)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router
const express = require("express");
const router = express.Router()
const User = require('../models/user')
const Order = require('../models/Orders')

router.post('/OrderData', async (req, res) => {
    let data = req.body.order_data
    console.log("Data:", req.body.email);
    // data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("order_data: ", data);
    // // console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log("eId:", eId)
    if (eId === null) {
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Order.insertMany([{
                email: req.body.email,
                order_data: [...data]
            }]).then(() => {
                res.status(201).send("Success");
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message);

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: [...data] } }).then(() => {
                    res.status(201).send("Success");
                })
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message);
        }
    }
})

module.exports = router;
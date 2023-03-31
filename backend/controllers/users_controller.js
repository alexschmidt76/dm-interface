// node dependencies
const bcrypt = require('bcrypt')
const users = require('express').Router()

// import db
const db = require('../models')
const { User, Campaign } = db

// create a user
users.post('/', async (req, res) => {
    // get info from body
    const { password, email, ...rest } = req.body

    // check if email is already associated with a user
    const foundUser = await User.findOne({
        where: { email: email },
        attributes: ['email']
    })

    // create user if email is new to db
    if (!foundUser) {
        const newUser = await User.create({
            ...rest,
            email,
            passwordDigest: await bcrypt.hash(password, 10)
        })
        res.json({ user: newUser })
    } else {
        res.status(403).json({
            message: "A user with this email already exists."
        })
    }
})

// get all of a user's camplaigns
users.get('/:userId/campaigns', async (req, res) => {
    // check if user exists
    const foundUser = await User.findOne({
        where: { user_id: req.params.userId },
        attributes: ['user_id']
    })
    
    // send campaign list if user exists
    if (!foundUser) {
        res.status(404).json({
            message: 'Error 404 user not found.'
        })
    } else {
        const foundCampaigns = await Campaign.findAll({
            where: { user_id: req.params.userId },
            attributes: ['campaign_id', 'createdAt', 'updatedAt', 'name']
        })
        res.json({ campigns: foundCampaigns })
    }

})

module.exports = users
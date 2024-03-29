// node dependencies
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

// express setup
const users = require('express').Router()

// import db
const { User, Campaign } = require('../models')

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
            passwordDigest: await bcrypt.hash(password, 10),
            campaigns: [],
            monsters: []
        })
        const result = await jwt.encode(process.env.JWT_SECRET, { id: newUser.user_id })
        res.json({ user: newUser, token: result.value })
    } else {
        res.status(403).json({
            message: "A user with this email already exists."
        })
    }
})

// get a user's info
users.get('/:userId', async (req, res) => {
    const foundUser = await User.findByPk(Number(req.params.userId))

    if (foundUser) {
        res.json(foundUser)
    } else {
        res.status(404).json({
            message: 'Error 404: User not found.'
        })
    }
})

// update a user's info
users.put('/:userId', async (req, res) => {

})

// delete a user
users.delete('/:userId', async (req, res) => {
    
})

// get all of a user's campaigns
users.get('/:userId/campaigns', async (req, res) => {
    // get all of user's campaigns
    const foundCampaigns = await User.findByPk(req.params.userId, {
        include: ["campaigns"]
    })

    if (foundCampaigns) {
        res.json(foundCampaigns.campaigns)
    } else {
        res.status(404).json({
            message: "Campaigns not found."
        })
    }
})

module.exports = users
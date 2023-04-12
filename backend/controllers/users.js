// node dependency
const bcrypt = require('bcrypt')

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
        res.json({ user: newUser })
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
        res.json({ user: foundUser })
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
        res.json({ campaigns: foundCampaigns.campaigns })
    } else {
        res.status(404).json({
            message: "Error 404: User not found."
        })
    }
})

// create a campaign belonging to a user
users.post('/:userId/campaigns', async (req, res) => {
    try {
        console.log(JSON.stringify(req.body))
        // create new campaign with body
        const newCampaign = await Campaign.create(req.body)
        res.json({ campaign: newCampaign })
    } catch (error) {
        res.status(500).json({
            message: 'Database error',
            error
        })
    }
})

module.exports = users
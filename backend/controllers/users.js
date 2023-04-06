// node dependencies
const bcrypt = require('bcrypt')
const users = require('express').Router()

// import db
const db = require('../models')
const { User, Campaign, Session } = db

/* USER INFO */

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
    const foundUser = User.findByPk(req.params.userId)

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

/* CAMPAIGNS */

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

// get a single campaign belonging to a user
users.get('/:userId/campaigns/:campaignId', async (req, res) => {
    // find campaign
    const foundCampaign = await Campaign.findByPk(req.params.campaignId, {
        include: ['sessions']
    })

    if (foundCampaign) {
        if (foundCampaign.user_id !== req.params.userId) {
            res.status(403).json({
                message: 'User is not permited to view this campaign.'
            })
        } else {
            res.json(foundCampaign)
        }
    } else {
        res.status(404).json({
            message: 'Error 404: Campaign not found.'
        })
    }
})

// update a campaign

// delete a campaign

/* SESSIONS */

// get single session
users.get('/:userId/campaigns/:campaignId/:sessionId', async (req, res) => {
    // find session
    const foundSession = await Session.findByPk(req.params.sessionId, {
        include: ['custom_monsters']
    })

    if (foundSession) {
        // check that this session belongs to this campaign
        if (foundSession.campaign_id === req.params.campaignId) {
            // check that this campaign belongs to this user
            const foundCampaign = await Campaign.findByPk(req.params.campaignId)
            if (foundCampaign && foundCampaign.user_id === req.params.userId) {
                res.json({ session: foundSession })
            } 
        } else {
            res.status(403).json({
                message: 'User is not permited to view this campaign.'
            })
        }
    } else {
        res.status(404).json({
            message: 'Error 404: Session not found.'
        })
    }
})

// create a session 
//users.post()

/* MONSTERS */

// get all monsters belonging to a user

// get a single monster

// create a new monster 

// update a monster

// delete a monster

module.exports = users
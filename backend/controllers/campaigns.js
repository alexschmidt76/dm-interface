// express setup
const campaigns = require('express').Router()

// import db
const { Campaign } = require('../models')

// get a single campaign belonging to a user
campaigns.get('/:campaignId', async (req, res) => {
    // find campaign
    const foundCampaign = await Campaign.findByPk(Number(req.params.campaignId), {
        include: ['sessions']
    })

    if (foundCampaign) {
        if (foundCampaign.user_id !== req.currentUser.user_id) {
            res.status(401).json({
                message: 'User is not authorized to view this campaign.'
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
campaigns.put('/:campaignId', async (req, res) => {
    // verify authorization
    try {
        const foundCampaign = await Campaign.findByPk(req.params.campaignId, {
            attributes: ['campaign_id', 'user_id']
        })
        if (req.currentUser.user_id === foundCampaign.user_id) {
            // update campaign
            try {
                const updatedCampaign = await Campaign.update(req.body, {
                    where: { campaign_id: req.params.campaignId }
                })
                res.json(updatedCampaign)
            } catch (error) {
                res.status(500).json({
                    message: 'Database Error',
                    error
                })
            }
        } else {
            res.status(401).json({
                message: 'User is not authorized to update this campaign.'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Database Error',
            error
        })
    }

    
})

// delete a campaign

module.exports = campaigns
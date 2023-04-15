// express setup
const sessions = require('express').Router()

// import db
const { Session } = require('../models')

// create a new session
sessions.post('/', async (req, res) => {
    // check authorization
    if (req.body.user_id === req.currentUser.user_id) {
        try {
            let { initiatives, ...rest } = req.body
            initiatives = JSON.stringify(initiatives)
            const newSession = await Session.create({...rest, initiatives})
            res.json(newSession)
        } catch (error) {
            res.status(500).json({
                message: 'Database error',
                error
            })
        }
    } else {
        res.status(401).json({
            message: 'User is not authorized to create this session.'
        })
    }
})

// get a session from its id
sessions.get('/:sessionId', async (req, res) => {
    // find session
    const foundSession = await Session.findByPk(req.params.sessionId, {
        include: ['campaign']
    })
    
    // check authorization
    if (req.currentUser.user_id === foundSession.user_id) {
        if (foundSession) {
            res.json(foundSession)
        } else {
            res.status(404).json({
                message: "Session not found"
            })
        }
    } else {
        res.status(401).json({
            message: 'User is not authorized to view this session.'
        })
    }
})

module.exports = sessions
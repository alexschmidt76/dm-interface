// express setup
const sessions = require('express').Router()

// import db
const { Session } = require('../models')

// create a new session
sessions.post('/', async (req, res) => {
    // check authorization
    if (req.body.user_id === req.currentUser.user_id) {
        try {
            const newSession = await Session.create(req.body)
            res.json({ session: newSession })
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
    const foundSession = await Session.findByPk(req.params.sessionId, {
        include: ['campaign']
    })

    if (foundSession) {
        res.json({ session: foundSession })
    } else {
        res.status(404).json({
            message: "Session not found"
        })
    }
})

module.exports = sessions
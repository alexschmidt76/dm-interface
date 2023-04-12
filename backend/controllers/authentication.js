// node dependencies
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

// express setup
const auth = require('express').Router()

// import db
const db = require('../models')
const { User } = db

// authenticate user login
auth.post('/', async (req, res) => {
    // find user with mathcing email
    const foundUser = await User.findOne({
        where: { email: req.body.email }
    })
    // return error message if user does not exist or password is incorrect
    if (!foundUser || !await bcrypt.compare(req.body.password, foundUser.passwordDigest)) {
        res.status(404).json({
            message: "Could not find a user with the provided email and password."
        })
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { id: foundUser.user_id })
        res.json({ user: foundUser, token: result.value })
    }
})

// get logged in user
auth.get('/profile', async (req, res) => {
    res.json(req.currentUser)
})

module.exports = auth
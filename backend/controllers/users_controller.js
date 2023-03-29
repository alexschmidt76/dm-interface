// node dependencies
const bcrypt = require('bcrypt')
const users = require('express').Router()

// import db
const db = require('../models')
const { User } = db

// get all users
users.get('/', async (req, res) => {
    try {
        // get all users from db
        const foundUsers = await User.findAll()
        res.json(foundUsers)
    } catch {
        // error message if db error
        res.status(500).json({
            message: 'Database Error',
            console
        })
    }
})

// create a user
users.post('/', async (req, res) => {
    // get info from body
    const { password, email, ...rest } = req.body

    // check if email is already associated with a user
    const foundUser = await User.findOne({
        where: { email: email }
    })

    // create user if email is new to db
    if (!foundUser) {
        const newUser = await User.create({
            ...rest,
            email,
            passwordDigest: await bcrypt.hash(password, 10)
        })
        res.json(newUser)
    } else {
        res.status(403).json({
            message: "A user with this email already exists."
        })
    }
})

module.exports = users
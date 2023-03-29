// npm packages
require('dotenv').config()
require('pg')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// express settings
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// base get route
app.get('/', (req, res) => {
    res.json({
        message: 'welcome to the dm-interface backend',
        routes: [
            '/users',
            '/monsters'
        ]
    })
})

// controllers
app.use('/users', require('./controllers/users_controller'))
app.use('/authentication', require('./controllers/authentication_controller'))

// define port
const PORT = process.env.PORT || 3001

// listen for connections
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
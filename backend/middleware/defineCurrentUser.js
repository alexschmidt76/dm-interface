const db = require('../models')
const jwt = require('json-web-token')

const { User } = db

async function defineCurrentUser (req, res, next) {
    try {
        // split auuthorization header
        const [authMethod, token] = req.headers.authorization.split(' ')
        // check 'Bearer' method
        if (authMethod === 'Bearer') {
            // decode jwt
            const result = await jwt.decode(process.env.JWT_SECRET, token)
            // get id from jwt
            const { id } = result.value
            // find user with id
            const user = await User.findByPk(id)
            req.currentUser = user
        }
        next()
    } catch (error) {
        req.currentUser = null
        next()
    }
}

module.exports = defineCurrentUser
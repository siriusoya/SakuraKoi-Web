const { User } = require('../models')
const { verifyToken } = require("../helpers/jws");

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers

        if(!access_token) {
            throw { name: 'Unauthenticated' }
        }

        let payload = verifyToken(access_token);

        console.log(payload);

        let user = await User.findByPk(payload.id)

        // console.log(payload, '<<< payload')

        if(!user) {
            throw { name: 'Unauthenticated' }
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication;
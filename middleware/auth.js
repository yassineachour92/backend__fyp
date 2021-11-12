const { jwtDecoder } = require("../config/auth");
const User = require('../models/Users.js')


module.exports  = async (req, res, next) => {
    console.log("auth")
    const token = req.headers['authorization']
    try {
        if (!token) {
            res.status(400).send({
                message: 'noTokenProvided'
            })
        }
        let decodedObject
        try {
            decodedObject = jwtDecoder(token)
        } catch (error) {
            res.status(400).send({
                message: "invalid token"
            })
        }
        console.log('decoder',decodedObject);
        const { _id } = decodedObject
        
        const user = await User.findById({_id})
        if (user) {
            req.user = user
            return next()
        } else {
            res.status(400).send({
                message: 'notLoggedIn'
            })
        }
    } catch (error) {
        next(error)
    }
    next()

}

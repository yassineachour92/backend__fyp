const jwt =  require("jsonwebtoken")

const secret = "wearenotonthelandoftheneighbor"

module.exports = {
    jwtEncoder: (payload, option) => {
        return jwt.sign(payload, secret, option)
    },
    jwtDecoder: (token) => {
        console.log("dec",secret)

        return jwt.verify(token, secret)
    }
} 
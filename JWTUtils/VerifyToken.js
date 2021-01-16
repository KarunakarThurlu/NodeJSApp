const jwt = require('jsonwebtoken');
const JWTConstants = require("../JWTUtils/JWTConstants");

exports.verify = async (request, response, next) => {
    try {
        let bearerToken = request.headers["authorization"];
        if (bearerToken === "undefined")
            return response.json({ "data": {}, "statusCode": "401", "message": "Token not present" });
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, JWTConstants.CONSTANTS.CLIENT_SECRET);
        next();
    } catch (error) {
        return response.json({ "data": {}, "statusCode": "500", "message": error.message });
    }
}
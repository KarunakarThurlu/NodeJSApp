const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.getUserFromToken = async (request) => {
    console.info(moment(new Date().toISOString(), 'DD MM YYYY hh:mm:ss') + " Enter into getUserName from Token method")
    let bearerToken = request.headers["authorization"].split(" ")[1];
    let decodedtoken = jwt.decode(bearerToken);
    console.log(decodedtoken);
    let user = await User.findOne({ email: decodedtoken.sub }).populate("roles");
    console.info(moment(new Date(), 'DD MM YYYY hh:mm:ss') + " Exit into getUserName from Token method")
    return user !== null ? user._doc : null;
}
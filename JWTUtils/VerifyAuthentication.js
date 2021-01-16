const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const GetUserFromToken = require("../Utils/GetUserFromToken");

exports.AdminOrUser = async (request, response, next) => {
    let user = await GetUserFromToken.getUserFromToken(request);
    try {
        if (user !== null) {
            if (user.roles.some(role => role.role_name === "ADMIN" || role.role_name === "USER")) {
                next()
            } else {
                return response.json({ "data": {}, "statusCode": 401, "message": "Access Denied" })
            }
        } else {
            return response.json({ "data": {}, "statusCode": 401, "message": "Access Denied" })
        }
    } catch (error) {
        return response.json({ "data": {}, "statusCode": 500, "message": error.message })
    }

}
exports.User = async (request, response, next) => {
    let user = await GetUserFromToken.getUserFromToken(request);
    try {
        if (user !== null) {
            if (user.roles.some(role => role.role_name === "USER")) {
                next()
            } else {
                return response.json({ "data": {}, "statusCode": 401, "message": "Access Denied" })
            }
        } else {
            return response.json({ "data": {}, "statusCode": 401, "message": "Access Denied" })
        }
    } catch (error) {
        return response.json({ "data": {}, "statusCode": 500, "message": error.message })
    }
}
exports.Admin = async (request, response, next) => {
    let user = await GetUserFromToken.getUserFromToken(request);
    try {
        if (user !== null) {
            if (user.roles.some(role => role.role_name === "ADMIN")) {
                next()
            } else {
                return response.json({ "data": {}, "statusCode": 401, "message": "Access Denied" })
            }
        }
    } catch (error) {
        return response.json({ "data": {}, "statusCode": 500, "message": error.message })
    }

}
exports.SuperAdmin = async (request, response, next) => {
    let user = await GetUserFromToken.getUserFromToken(request);
    if (user.roles.some(role => role.role_name === "SUPER_ADMIN")) {
        next()
    } else {
        return response.json({ "data": {}, "statusCode": 401, "message": "Access Denied" })
    }
}

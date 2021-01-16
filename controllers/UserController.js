const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../Utils/GetUserFromToken');
const JWTConstants = require("../JWTUtils/JWTConstants");
const moment = require('moment');

//login
exports.login = async (request, response, next) => {
    try {
        let user = await User.findOne({ email: request.body.email });
        if (user === null)
            return response.json({ "data": request.body, "statusCode": 400, "message": request.body.email + " is not Found in our database. Please signup!." });
        let validpassword = await bcrypt.compare(request.body.password, user.password);
        if (!validpassword)
            return response.json({ "data": request.body, "statusCode": 400, "message": "Invalid UserName Or Password!" });
        const token = jwt.sign({ sub: user.email }, JWTConstants.CONSTANTS.CLIENT_SECRET, { expiresIn: JWTConstants.CONSTANTS.TOKEN_EXPIRES_IN, issuer: JWTConstants.CONSTANTS.ISSUER });
        return response.json({ "data": user, "statusCode": 200, "message": "OK", "token": token });
    } catch (error) {
        return response.json({ "data": {}, "statusCode": 500, "message": error.message });
    }
};
//Save User
exports.saveUser = async (request, response, next) => {
    try {
        let userExists = await User.findOne({ email: request.body.email });
        if (userExists)
            return response.json({ "data": request.body, "statusCode": "400", "message": `Email ${request.body.email} Already Exists` });
        let roles = [];
        if (request.body.roles.length !== 0) {
            let rolesFromUI = request.body.roles;
            for (let role of rolesFromUI) {
                let roleExisted = await Role.findOne({ role_name: role.role_name });
                if (roleExisted === null) {
                    roleExisted = await Role.save({ role_name: role.role_name });
                    roles.push(roleExisted._id);
                } else {
                    roles.push(roleExisted._id);
                }
            }
        }
        let userObj = new User({
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, 10),
            roles: roles
        });
        await userObj.save();
        return response.json({ "data": userObj, "statusCode": "200", "message": "User Saved" });
    } catch (error) {
        return response.json({ "data": {}, "statusCode": "500", "message": error.message });
    }
}

//Get User ById
exports.getUserById = async (request, response) => {
    let foo = await getUser.getUserFromToken(request)
    console.log(foo);
    await User.findOne({ _id: request.params.id })
        .populate('roles')
        .then((user) => {
            if (user) {
                return response.json({ "data": user, "statusCode": 200, "message": "OK" })
            } else {
                return response.json({ "data": {}, "statusCode": 400, "message": "Bad Request" })
            }
        }).catch(error => {
            return response.json({ "data": {}, "statusCode": 500, "message": error.message })
        });
}

//Update User
exports.updateUser = async (request, response) => {
    try {
        let foo = getUser.getUserFromToken(request)
        console.log(foo);
        let user = await User.findOne({ _id: request.params.id });
        let roles = [];
        if (request.body.roles.length !== 0) {
            let rolesFromUI = request.body.roles;
            for (let role of rolesFromUI) {
                let roleExisted = await Role.findOne({ role_name: role.role_name });
                if (roleExisted === null) {
                    roleExisted = await Role.save({ role_name: role.role_name });
                    roles.push(roleExisted._id);
                } else {
                    roles.push(roleExisted._id);
                }
            }
        }
        user.roles = roles;
        const updateduser = await user.save();
        if (user) {
            return response.json({ "data": updateduser, "statusCode": 200, "message": "Updated" });
        } else {
            return response.json({ "data": user, "statusCode": 400, "message": "User Not Found" });
        }
    } catch (error) {
        return response.json({ "data": {}, "statusCode": 500, "message": error.message });
    }
}

//Get AllUsers
exports.getallusers = async (request, response) => {
    try {
        console.info(moment().toNow() + " Enter into getAllUsers of UserController!.")
        const users = await User.find().populate('roles');
        if (users) {
            return response.json({ "data": users, "statusCode": 200, "message": "OK" })
        } else {
            return response.json({ "data": [], "statusCode": 400, "message": "Bad Request" })
        }
        console.info(new Date() + " Exit into getAllUsers of UserController!.")

    } catch (error) {
        console.error(new Date() + " Error occur getAllUsers of UserController!.")
        return response.json({ "data": [], "statusCode": 500, "message": error.message })
    }
}

//Delete UserById
exports.deleteuser = async (request, response) => {
    const user = await User.findOneAndDelete({ _id: request.params.id });
    if (!user) {
        return response.json({ "data": user, "statusCode": 400, "message": "Bad Request" });
    } else {
        return response.json({ "data": user, "statusCode": 200, "message": "deleted" });
    }
}
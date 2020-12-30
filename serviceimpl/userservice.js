const User = require("../models/user.model");

module.exports = {

    //Save User
    saveUser: (userData) => {
        const user = new User({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phono: userData.phono
        })
        user.save();
        return user;
    },
};

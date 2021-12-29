const mongoose = require('mongoose')
const User = require('../models/User')

const findAllUsers = (req, res) => {
    User.find((err,users) => {
        err && res.status(500).send(err.message)
        res.status(200).json(users)
    })
}

const login = (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password
    })
    User.findOne({username:user.username, password:user.password}, (err, user) => {
        if(!user) {
            res.status(501).send('User invalid')
        }else{
            console.log(req.body)
            res.status(200).json(user)
        }
    })
}

const register = (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    user.save((err, usr) => {
        err && res.status(500).send(err.message)
        res.status(200).json(usr)
    })
}

module.exports = {login, register, findAllUsers}
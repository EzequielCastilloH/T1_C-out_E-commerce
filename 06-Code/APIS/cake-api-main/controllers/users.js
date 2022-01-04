const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const findAllUsers = (req, res) => { 
    User.find((err,users) => {
        err && res.status(500).send(err.message)
        res.status(200).json(users)
    })
}

const login = (req, res) => { 

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        rol: req.body.rol
    })

    const userForToken = {
        id: user._id,
        username: user.username,
        rol: user.rol
    }

    const token = jwt.sign(userForToken,'awd',{expiresIn: 60*60*24*7})

    User.findOne({username:user.username, password:user.password}, (err, user) => {
        if(!user) {
            res.status(501).send('User invalid')
        }else{
            console.log('OK')
            res.status(200).send({
                name: user.name,
                username: user.username,
                rol: user.rol,
                token
            })
        }
    })
}

const register = (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        rol: req.body.rol
    })
    user.save((err, usr) => {
        err && res.status(500).send(err.message)
        res.status(200).json(usr)
    })
}

module.exports = {login, register, findAllUsers}
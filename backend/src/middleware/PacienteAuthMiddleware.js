const express = require('express')

const jwt = require('jsonwebtoken')

let authSecret = require('../auth/authSecret')


module.exports = function PacienteAuthMiddleware(req,res,next) {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(400).json({errBackend: 'Token invalido'})
    }

    const token = authorization.replace('Bearer', '').trim()

    try {

        const data = jwt.verify(token, authSecret.secretPaciente)

        console.log(data)

        const {id} = data

    
            req.userId = id

            return next()
        
    

    }
    catch(err) {
        console.log(err)
        res.status(400).send('Token Invalido')   
    }
}
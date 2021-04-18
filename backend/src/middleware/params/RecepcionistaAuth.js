const express = require('express')

const jwt = require('jsonwebtoken')

const authSecret = require('../../auth/authSecret')

module.exports = function RecepcionistaAuthParamsMiddleware(req, res, next) {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(400).json({errBackend: 'Não autorizado'})
    }

    const token = authorization.replace('Bearer', '').trim()

    try {

        const data = jwt.verify(token, authSecret.secretRecepcionista) 

        console.log(data)

        const {id} = data

        if(id == req.params.id || id == req.query.id) {
            req.userId = id

            return next()
        }
        else {
            res.status(401).send('Sem autorização!, Token Inválido!')
        }

    }
    catch(err) {
        console.log(err)
        res.status(401).send('No authorization!')
    }
}
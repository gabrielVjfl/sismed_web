const express = require('express')

const jwt = require('jsonwebtoken')
const authSecret = require('../../auth/authSecret.json')

module.exports = function MedicoAuthParamsMiddleware(req, res, next) {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(400).json({errBackend: 'Token invalido'})
    }
    
    const token = authorization.replace('Bearer', '').trim()

    try {

      const data = jwt.verify(token, authSecret.secret)

        console.log(data)

        const {id} = data

        // Validar o params :id para o usuario acessar só o dele
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
    res.status(400).send('Token Invalido')
    }
}
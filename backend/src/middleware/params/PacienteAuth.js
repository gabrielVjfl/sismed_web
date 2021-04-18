const express = require('express')

const jwt = require('jsonwebtoken')

let authSecret = require('../../auth/authSecret')

module.exports = function PacienteAuthParamsMiddleware(req,res,next) {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(400).json({errBackend: 'Token invalido'})
    }

    const token = authorization.replace('Bearer', '').trim()

    try {

        const data = jwt.verify(token, authSecret.secretPaciente)

        console.log(data)

        const {id} = data

          if(id == req.params.id || id == req.query.id) {

              req.userId = id

              return next()
          }
        else {
            res.status(400).send('Sem Autorização, Token Inválido!')
        }
    

    }
    catch(err) {
        console.log(err)
        res.status(400).send('Sem Autorização, Token Inválido!')   
    }
}
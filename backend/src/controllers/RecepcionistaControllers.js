const express = require('express')


let Model = require('../models')

let Recepcionista = Model.Recepcionistas

let Medico = Model.Medico

let Paciente = Model.Paciente

let Agendamentos = Model.Agendamentos

const bcryptjs = require('bcryptjs')

let jwt = require('jsonwebtoken')

const authSecret = require('../auth/authSecret.json')

class RecepcionistaControllers {


    async register(req,res) {

        try {

        if(req.body.name == '') {
            res.status(400).json({errBackend: 'Nome vázio'})
            }
            else if(req.body.name.length < 4) {
             res.status(400).json({errBackend: 'Nome: Minimo 4 Caracteres!'})
            }
            else if(req.body.email == '') {
             res.status(400).json({errBackend: 'Email vázio'})
            }
            else if(req.body.email.length < 5) {
             res.status(400).json({errBackend: 'Email: Minimo 5 caracteres'})
            }
            else if(req.body.password == '') {
             res.status(400).json({errBackend: 'Senha vázia'})
            }
            else if(req.body.password.length < 5) {
             res.status(400).json({errBackend: 'Senha: Minimo 5 caracteres'})
            }
            else {
        
        const salt = await bcryptjs.genSalt()

        const hashedpassword = await bcryptjs.hash(req.body.password, salt)

        req.body.password = hashedpassword

        const {
        name,
        email,
        password,
        medicoId
        } = req.body

        if(email.indexOf('@') == -1) { //se não tiver o @
            res.status(400).send({errBackend: 'Email tem que ter um @'})
          }

          else {

        const data = {
            name,
            email,
            password,
            medicoId
        }

        let existsEmail = await Recepcionista.findOne({where: {email: email}})

        let existsMedico = await Recepcionista.findOne({where: {medicoId: medicoId}})


        if(existsEmail)  {
        res.status(400).json({errBackend: 'Email já cadastrado!'})
        }
        
        else if(existsMedico) {
        res.status(400).json({errBackend: 'O médico já possui uma recepcionista!'})
        }

        else {
       
        let user = await Recepcionista.create(data)

        user.password = undefined

        const token = jwt.sign({id: user.id}, authSecret.secretRecepcionista,{
              expiresIn: 86400
        })

        res.status(200).json({user, token})
        }
    }
    }
}
catch(err) {
    console.log(err)
}
    }
    async login(req,res) {

        try {
        
        if(req.body.email.length < 5) {
             res.status(400).json({errBackend: 'Email: Minimo 5 caracteres'})
            }
            else if(req.body.password == '') {
             res.status(400).json({errBackend: 'Senha vázia'})
            }
            else if(req.body.password.length < 5) {
             res.status(400).json({errBackend: 'Senha: Minimo 5 caracteres'})
            }

            else {

            const {
            email,
            password
            } = req.body

            let user = await Recepcionista.findOne({where: {email: email}})


            if(!user) {
                res.status(400).json({errBackend: 'Email não cadastrado!'})
            }

            
            else if(!await bcryptjs.compare(password, user.password)) {
                    res.status(400).json({errBackend: 'Senha incorreta!'})
            }

            else {

               let token = jwt.sign({id: user.id}, authSecret.secretRecepcionista, {
                   expiresIn: 86400

            })

            user.password = undefined

                 res.status(200).json({user, token})

            }

            }
        }
        catch(err) {
          console.log(err)
     }
    }

    async indexparams(req,res) {
        try {
        const {id} = req.params

       let response = await Recepcionista.findOne({where: {id: id}, 
        attributes: ['id','name', 'email', 'medicoId'], 
        include: [{model: Medico, attributes: ['id', 'name', 'email']}]})

           
        if(response == null) {
            res.status(400).send({errBackend: 'Não tem essa recepcionista'})
        }

                else {
                    res.status(200).json([response])
                }

            }
            catch(err) {
                console.log(err)
                res.status(400).json(err)
            }
    }
    
    async agendamentos(req,res) {
        try {
        const {id} = req.params

let response = await Recepcionista.findOne({where: {id: id}, attributes: ['name', 'email'],
    include: [{all:true}]})
        if(response == null) {
            res.status(400).json({errBackend: 'Sem agendamentos'})
         
        }

        else {
            res.status(200).json(response)
        }
    }
    catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
    }

   async listPacientes(req,res) {
       try {
           const {id} = req.params

let response = await Recepcionista.findAll({where: {id:id}, include:[{model: Paciente}]})

    res.status(200).json(response)


       }
       catch(err) {
       console.log(err)
       res.status(400).json(err)
       }
   }
}

module.exports = new RecepcionistaControllers


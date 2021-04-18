const express = require('express');

let Model = require('../models')

let Paciente = Model.Paciente

let Agendamentos = Model.Agendamentos

let Medico = Model.Medico

let bcryptjs = require('bcryptjs')

let jwt = require('jsonwebtoken')

const authSecret = require('../auth/authSecret.json')

let Relatorio = Model.Relatorio

const Criptografia = require('../cript/crypt')

const validarCpf = require('validar-cpf');

class PacienteControllers {

async create(req,res) {

    try {

        
      let validationCpf = validarCpf(req.body.cpf)

      if (validationCpf == false) {
        res.status(401).json({ errBackend: 'Cpf inválido!' })
      }

    else if(req.body.name == '') {
        res.status(400).json({errBackend: 'Nome vázio'})
       }
       else if(req.body.name.length < 3) {
        res.status(400).json({errBackend: 'Email: Minimo 3 caracteres'})
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
       else if(req.body.telefone == '') {
        res.status(400).json({errBackend: 'Telefone vázio'})
       }
       else if(req.body.telefone.length < 10) {
        res.status(400).json({errBackend: 'Telefone: Minimo 10 caracteres'})
       }
       else if(req.body.cpf == '') {
        res.status(400).json({errBackend: 'Cpf vázio'})
       }
      
       else if(req.body.rua == '') {
        res.status(400).json({errBackend: 'Rua vázia'})
       }
       else if(req.body.bairro == '') {
        res.status(400).json({errBackend: 'Bairro vázio'})
       }
       else if(req.body.numero == '') {
        res.status(400).json({errBackend: 'Número da residencia vázio'})
       }
       else if(req.body.medicoId == '') {
           res.status(400).json({errBackend: 'Médico vázio'})
       }
       else if(req.body.RecepcionistumId == '') {
        res.status(400).json({errBackend: 'Recepcionista vázio'})
    }

    else {

    let salt = await bcryptjs.genSalt()

    let hashedpassword = await bcryptjs.hash(req.body.password, salt)

   
    req.body.password = hashedpassword
    

    
    let hashedCpf = await Criptografia(req.body.cpf)

    req.body.cpf = hashedCpf

  

   const {
   name,
   email,
   password,
   telefone,
   cpf,
   rua,
   bairro,
   cidade,
   numero,
   medicoId,
   RecepcionistumId,
   recepcionistaId

   } = req.body

   let existsCpf = await Paciente.findOne({where: {cpf: cpf}})
 
   let existsEmail = await Paciente.findOne({where: {email: email}})

   if(email.indexOf('@') == -1) {
       res.status(400).json({errBackend: 'Email precisa de um @'})
   }

   else if(existsEmail) {
    res.status(400).json({errBackend: 'Email já cadastrado'})
   }
   else if(existsCpf) {
    res.status(400).json({errBackend: 'Cpf já cadastrado!'})
   }


   else {


   const data = {
    name,
    email,
    password,
    telefone,
    cpf,
    rua,
    bairro,
    cidade,
    numero,
    medicoId,
    RecepcionistumId,
    recepcionistaId
   
   }

 





    let user = await Paciente.create(data)

    let token = jwt.sign({id: user.id}, authSecret.secretPaciente, {
        expiresIn: 86400
    })

    user.password = undefined
    user.cpf = undefined

    res.status(200).json({user, token})

   }
   }


    }
    catch(err) {
        console.log(err)
    }
}
async login(req,res) {

   try {


    if(req.body.email == '') {
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


    const {
        email,
        password
    } = req.body

    const user = await Paciente.findOne({where: {email: email}})
    
    if(!user) {
        res.status(400).json({errBackend: 'Email não cadastrado!'})
    }
    
    if(!await bcryptjs.compare(password, user.password)) {
        res.status(400).json({errBackend: 'Senha Incorreta!'})
    }

    const token = jwt.sign({id: user.id}, authSecret.secretPaciente, {
        expiresIn: 86400
    })

    user.password = undefined
    user.recepcionistaId = undefined

    res.status(200).json({user, token})
}
   }
   catch(err) {
       console.log(err)
   }
}
async index(req,res) {
    try {
   let response =  await Paciente.findAll()
        if(response == null) {
            res.status(400).json({errBackend: 'Sem pacientes'})
        }
        else {
            res.status(200).json(response)
        }
    }
    catch(err) {
        res.status(400).json({errBackend: 'Ocorreu um erro'})
    }
}
async agendamentos(req,res) {

    try {
    const {id} = req.params
   
   let response = await Paciente.findOne({where: {id: id}, 
    attributes: ['id', 'name', 'email', 'telefone',
'cidade', 'rua', 'bairro', 'numero', 'medicoId', 'RecepcionistumId'],
include: [{model: Agendamentos}]})

       if(response == null) {
       res.status(400).json({errBackend: 'Sem Agendamentos'})

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
async medico(req,res) {
    try {
    const {id} = req.params

   let response = await Paciente.findOne({where: {id: id}, 
    attributes: ['id', 'name', 'email', 'telefone',
    'cidade', 'rua', 'bairro', 'numero', 'medicoId', 'RecepcionistumId'],
     include: [{model: Medico, attributes: ['name', 'email']}]})

       if(response == null) {
       res.status(400).json({errBackend: 'Sem Agendamentos'})

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
async agendamentos(req,res) {
    try {
    const {id} = req.params

    let response = await Paciente.findOne({where: {id:id}, 
    attributes: ['id', 'name', 'email', 'telefone',
    'cidade', 'rua', 'bairro', 'numero', 'medicoId', 'RecepcionistumId'], 
    include: [{model: Agendamentos}]})

    if(response == null) {
        res.status(200).json({errBackend: 'Esse paciente não possui agendamentos'})
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
async relatorios(req,res) {
    try {
    const {id} = req.params

  let response = await Paciente.findOne({where: {id: id},
    include: [{model: Relatorio}]})
        console.log(response)

        if(response == null) {
            res.status(400).json({errBackend: 'Sem relatorios'})
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
}


module.exports = new PacienteControllers

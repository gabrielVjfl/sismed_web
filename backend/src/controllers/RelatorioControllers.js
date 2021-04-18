const express = require('express');

const Model = require('../models')

const Relatorio = Model.Relatorio
const Medico = Model.Medico
const Paciente = Model.Paciente


const {Op} = require('sequelize')

class RelatoriosController {
 async create(req,res) {

   try {

  const {originalname: name, location: url = ''} = req.file

  console.log(req.file)

      const {
      descricao,
      medicamentos,
      pacienteId,
      medicoId,
      } = req.body

      
      const data = {
        descricao,
        medicamentos,
        pacienteId,
        medicoId,
        name,
        url,
      }

      let response = await Relatorio.create(data)
      
      console.log(response)

        res.status(200).json(response)

    }
        
      catch(err) {
        console.log(err)
        res.status(400).json(err)
      }
  }
  async list(req,res) {
    try {
      const {MedicoId} = req.params
   
      let response = await Relatorio.findAll({where: {MedicoId: MedicoId},
      include: [{model: Paciente}]})

      res.status(200).json(response)

    }
    catch(err) {
      console.log(err)
    }
  }
  async listFilter(req,res) {
    try {
    const {MedicoId} = req.params
    const {search} = req.query

    let response = await Relatorio.findAll({where: {MedicoId: MedicoId, 
    descricao: {[Op.like]: `%${search}%`}}, include: [{model:Paciente}]})

    res.status(200).json(response)

    }
    catch(err) {
    console.log(err)
    res.status(400).json({errBackend: 'Ocorreu um erro'})
    }
  }
}
module.exports = new RelatoriosController()
const express = require('express')

let Model = require('../models')

let Agendamento = Model.Agendamentos

let Medico = Model.Medico

let datefns = require('date-fns')
// formatar a data 
//let isPast = datefns.isPast // a partir daquele momneto

class AgendamentoController {
    async create(req, res) {
        // VALIDAÇÕES
try {
    const {
    descricao,
    day,
    hora,
    status,
    pacienteId,
    medicoId,
    recepcionistaId
    } = req.body

    // formatação
    const parsedDateTime = datefns.parseISO(day)
   
    

   // sem data no passado
   if(datefns.isPast(parsedDateTime)) {
    res.status(400).json({errBackend: 'Essa data ja passou!'})
}


else {

    const data = {
        descricao,
        day: parsedDateTime,
        hora,
        status,
        pacienteId,
        medicoId,
        recepcionistaId
    }

    let existsDay = await Agendamento.findOne({where: {day: day, medicoId: medicoId, hora: hora}})

    let existsDayPaciente = await Agendamento.findOne({where: {day: day, hora:hora, pacienteId: pacienteId}})

    if(existsDay) {
        res.status(401)
        .json({errBackend: 'Já existe uma consulta marcada nesse dia e hora com esse médico!'})
    }
    else if(existsDayPaciente) {
        res.status(401).json({errBackend: 'Esse paciente já tem uma consulta na mesma data e hora'})
    }
    else {
    let response = await Agendamento.create(data)
        console.log(response)

        res.status(200).json(response)

    }
}
}
    catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
    }
    
    async countAgendadas(req, res) {
        try {

            const {medicoId} = req.params

        let contagem = await Agendamento.count({where: {medicoId: medicoId}})

        res.status(200).json(contagem)
        }
        catch(err) {
         res.status(400).json(err)
        }
    }
}
module.exports = new AgendamentoController
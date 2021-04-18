const express = require("express");

let Model = require("../models");

let Medico = Model.Medico;

let Recepcionista = Model.Recepcionistas;

let Paciente = Model.Paciente;

let Agendamento = Model.Agendamentos;

let Relatorio = Model.Relatorio;

const bcryptjs = require("bcryptjs");

let jwt = require("jsonwebtoken");

const authSecret = require("../auth/authSecret.json");

const { Op } = require('sequelize')

class MedicoController {
  async register(req, res) {

    try {
    // Token Jwt!

    if (req.body.name == "") {
      res.status(400).json({ errBackend: "Nome vázio" });
    } else if (req.body.name.length < 4) {
      res.status(400).json({ errBackend: "Nome: Minimo 4 Caracteres!" });
    } else if (req.body.email == "") {
      res.status(400).json({ errBackend: "Email vázio" });
    } else if (req.body.email.length < 5) {
      res.status(400).json({ errBackend: "Email: Minimo 5 caracteres" });
    } else if (req.body.password == "") {
      res.status(400).json({ errBackend: "Senha vázia" });
    } else if (req.body.password.length < 5) {
      res.status(400).json({ errBackend: "Senha: Minimo 5 caracteres" });
    } else {
      const salt = await bcryptjs.genSalt();

      const hashedPassword = await bcryptjs.hash(req.body.password, salt);

      req.body.password = hashedPassword;

      const { name, email, password } = req.body;

      if (email.indexOf("@") == -1) {
        //se não tiver o @
        res.status(400).send({ errBackend: "Email tem que ter um @" });
      } else {
        const data = {
          name,
          email,
          password,
        };

        let existsEmail = await Medico.findOne({ where: { email: email } });

        if (existsEmail) {
          res.status(400).json({ errBackend: "Email já cadastrado!" });
        }
        else {

        let user = await Medico.create(data);

        user.password = undefined;

        const token = await jwt.sign({ id: user.id }, authSecret.secret, {
          expiresIn: 86400,
        });

        res.status(200).send({ user, token });
      }
      }
    }
  }
  catch(err) {
    console.log(err)
  }
  }
  async login(req, res) {

    try {

    if (req.body.email == "") {
      res.status(400).json({ errBackend: "Email vázio" });
    } else if (req.body.email.length < 5) {
      res.status(400).json({ errBackend: "Email: Minimo 5 caracteres" });
    } else if (req.body.password == "") {
      res.status(400).json({ errBackend: "Senha vázia" });
    } else if (req.body.password.length < 5) {
      res.status(400).json({ errBackend: "Senha: Minimo 5 caracteres" });
    } else {
      
      const { email, password } = req.body;

      const user = await Medico.findOne({ where: { email: email } });

      if (!user) {
        res.status(400).json({ errBackend: "Email não cadastrado!" });
      }

      else if (!(await bcryptjs.compare(password, user.password))) {
        res.status(400).json({ errBackend: "Senha Incorreta!" });
      }
else {
      const token = await jwt.sign({ id: user.id }, authSecret.secret, {
        expiresIn: 86400,
      });

      user.password = undefined;

      res.status(200).json({ user, token });
    }
    }
  }
  catch(err) {
    console.log(err)
  }
  }

  async index(req, res) {
    try {
      let response = await Medico.findAll({
        attributes: ["id", "name", "email"],
      });
      console.log(response);

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json({ errBackend: "Ocorreu um erro" });
    }
  }

  async recepcionista(req, res) {
    try {
      const { id } = req.params

      

      let response = await Medico.findAll({
        where: { id: id },
        attributes: ["name", "email"],
        include: [{ model: Recepcionista,
        attributes: ["id","name", "email"] }]})

      res.status(200).json(response)

    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async pacientes(req, res) {
    try {
      const { id } = req.params;

      var {page} = req.query

      let response = await Medico.findOne({
        where: { id: id },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Paciente,
            attributes: [
              "id",
              "name",
              "email",
              "telefone",
              "rua",
              "bairro",
              "cidade",
            ],
            order: [["id", "DESC"]],
            limit: 5,
            offset: (page - 1) * 5,
          },
        ],
        
       

      });
      console.log(response);

      if (response == null) {
        res.status(400).json({ errBackend: "Sem pacientes" });
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async pacientesAsc(req, res) {
    try {
      const { id } = req.params;
     // var {page} = req.query

      let response = await Medico.findOne({
        where: { id: id },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Paciente,
           
            order: [["name", "ASC"]],
            //limit: 5,
            //offset: (page - 1) * 5,
          },
        ],
       
      });
      console.log(response);

      if (response == null) {
        res.status(400).json({ errBackend: "Médico não existe" });
      } else {
        res.status(200).json(response);
      }
      
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }

  async pacientesAscList(req, res) {
    try {
      const { id } = req.params;
      var {page} = req.query

      let response = await Medico.findOne({
        where: { id: id },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Paciente,
            attributes: [
              "id",
              "name",
              "email",
              "telefone",
              "rua",
              "bairro",
              "cidade",
            ],
            order: [["name", "ASC"]],
            limit: 5,
            offset: (page - 1) * 5,
          },
        ],
       
      });
      console.log(response);

      if (response == null) {
        res.status(400).json({ errBackend: "Médico não existe" });
      } else {
        res.status(200).json(response);
      }
      
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }



  async agendamentos(req, res) {
    try {
      const { id } = req.params; // vem do localstorage ou async storage

      var {page} = req.query

      let response = await Medico.findOne({
        where: { id: id },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Agendamento,
            attributes: ["id", "descricao", "day", "hora"],
            order: [["id", "DESC"]],
            limit: 5,
            offset: (page - 1) * 5,

          
            include: [
              { model: Paciente, attributes: ["name", "email", "telefone"] },
            ],
          },
        ],
        
      });

  
        res.status(200).json(response);
      
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
}

  // mais próximos
  async agendamentosOrder(req, res) {
    try {
      const { id} = req.params; // vem do localstorage ou async storage

      var {page} = req.query

      //const {day} = req.query

      let response = await Medico.findOne({
        where: { id: id },
        attributes: ["id", "name", "email"],
       
        include: [
          {
           
            model: Agendamento,
            attributes: ["id", "descricao", "day", "hora"],
            order: [["id", "ASC"]],
            limit: 5,
            offset: (page - 1) * 5,

          
            include: [
              { model: Paciente, attributes: ["name", "email", "telefone"]},
            ],
          },
        ],
       
        
      });


        res.status(200).json(response);
      
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
  async agendamentosDate(req, res) {

    const { id } = req.params; 

    var {day} = req.query


    try {
  
      let response = await Medico.findOne({
        where: { id: id},
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Agendamento,
            attributes: ["id", "descricao", "day", "hora"],

            where: {day: {
                [Op.eq]: new Date(day),
                
            }},

            include: [
              { model: Paciente, attributes: ["name", "email", "telefone"] },
            ],
          },
        ],
        order: [[Agendamento, "day", "DESC"]],
      });

    
       res.status(200).json(response);
   
    } catch (err) {
   console.log(err)
      res.status(400).send(err);
    }
  }
  async agendamentosFilter(req, res) {
    try {
      var { id, descricao } = req.query // vem do localstorage ou async storage


      let response = await Medico.findAll({
        where: { id: id},
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Agendamento,
            attributes: ["id", "descricao", "day", "hora"],
            where: {descricao: descricao},
          
            include: [
              { model: Paciente, attributes: ["name", "email", "telefone"],
              
            },
              
            ],

          },
        ],
        order: [[Agendamento, "day", "DESC"]],
      });

      if (response == null) {
        res
          .status(400)
          .json({ errBackend: "Esse médico não possui agendamentos" });
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
  async relatorio(req, res) {
    try {
      const { id } = req.params;

      let response = await Medico.findOne({
        where: { id: id },
        attributes: ["id", "name", "email"],
        include: [
          {
            model: Relatorio,
            attributes: [
              "id",
              "descricao",
              "medicamentos",
              "name",
              "pacienteId",
              "medicoId",
              "createdAt",
            ],
          },
        ],
      });
      console.log(response);

      if (response == null) {
        res.status(400).json({ errBackend });
      } else {
        res.status(200).json(response);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
  async ok(req, res) {
    try {
    let response = await Medico.findAll({limit:2})

    res.status(200).json(response)
    }
    catch(err) {
      console.log(err)
      res.status(400).json({err: 'Ocorreu um erro'})

    }
  }

  async indexParamsPaciente(req,res) {
    try {
    const {id} = req.params
    const {idPaciente} = req.query

    let response = await Medico.findAll({where: {id: id},
    include:[{model: Paciente, where: {id: idPaciente}}]})
    
    res.status(200).json(response)
    
    }
    catch(err) {
    res.status(400).json(err)
    }
  }
}

module.exports = new MedicoController();

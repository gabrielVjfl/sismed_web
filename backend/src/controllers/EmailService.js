const express = require('express')
const nodemailer = require('nodemailer')
const Path = require('path')

class EmailService {
    async send(req,res) {
        try {

            const {originalname: name, location: path = '', mimetype: contentType} = req.file

            console.log(req.file)
           
        const {
             from,
             to,
             subject,
             text,
             user,
             pass,
             host,
             port
            // filename,
            // path,
           
            
        } = req.body

        



        const transporter = nodemailer.createTransport({
            host: `${host}`,// botão no frontend pra escolher
            port: `${port}`,
            auth: {
                user: `${user}`,
                pass: `${pass}`
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const mailSent = {
            text: `${text}`,
            subject: `${subject}`,
            from: `${from} <${user}`,
            to: `${to}`,
            attachments: [{
               filename: `${name}`, // original name
               path: `${path}`, // path
               contentType: `${contentType}` 
              }],
            html: `
           <html>
           <body>
           <h1>${text}</h1>
          </body>
          </html>
        `
        
        }
        const info = await transporter.sendMail(mailSent)

        console.log(info)

        res.status(200).json({sucBackend: 'Email Enviado'})
        }
        catch(err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}
module.exports = new EmailService()
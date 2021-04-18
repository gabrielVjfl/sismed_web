import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios'
import {RecepcionistaContext} from '../../services/context/contextApi/RecepcionistaContext'

import URL from '../../utils/URL'
import PersistentRecep from '../../utils/persist/PersistentRecep'
import Loading from '../../utils/Loading.js'
const SendEmailPaciente = ({myid, handleClose}) => {

    const {dispatch, state} = useContext(RecepcionistaContext)

    const [host, setHost] = useState('') // option
    const [from, setFrom] = useState(state.dados.name) // context
    const [to, setTo] = useState('') // params function props
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [user, setUser] = useState(state.dados.email) // context
    const [pass, setPass] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    
    const [contentType, setContentType] = useState(null)

    const [port, setPort] = useState(0)

    
    const [sucMsg, setSucMsg] = useState(false);
    const [errMsg, setErrMsg] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        HandlePacientes()
    }, [myid])


    useEffect(() => {
    HandlePacientes()
    }, [])



    const onFileChange = (e) => { 
        // ONCHANGE DAS IMAGEMS
        setSelectedFile(e.target.files[0]); 
        
      }; 

      const HandlePacientes = async() => {
        try {
    let response = await Axios.get(`${URL}/medicos/pacientes/${state.dados.MedicoId}?idPaciente=${myid}`)

    console.log('Minha resposta', response.data[0].Pacientes[0].email)

    setTo(response.data[0].Pacientes[0].email)
    
        }
        catch(err) {
    
        }
    }

    const HandleSubmit = async(e) => {
        try {
        e.preventDefault()
        setLoading(true)
        const data = new FormData()

        data.append('host', host)
        data.append('from', from)
        data.append('to', to)
        data.append('subject', subject)
        data.append('text', text)
        data.append('user', user)
        data.append('pass', pass)
        data.append('file', selectedFile, selectedFile.name)
        data.append('port', port)

    
            let response = await Axios.post(`${URL}/email/send`, data)
            console.log(response) 
              
            setSubject('')
            setText('')
                
            setLoading(false)
            setSucMsg(true)
            setErrMsg(false)
                
        
                
        }
        
   
        catch(err) {
        setSucMsg(false)
        setErrMsg(true)
        setLoading(false)
         console.log(err)
        }
    }

    useEffect(() => {
    if(to.match(/@gmail/)) {
        setHost("smtp.gmail.com")
    }
    else if(to.match(/@hotmail/)) {
        setHost("smtp.live.com")
    }
    else if(to.match(/@outolook/)) {
        setHost("SMTP.office365.com")
    }
    }, [to])

    useEffect(() => {
        if(host == "smtp.gmail.com") {
            setPort(587)
        }
        else if(host == "smtp.live.com") {
            setPort(465)
        }
        else if(host == "SMTP.office365.com") {
            setPort(587)
        }
    }, [host])




    return (
        <div className="card">
        <div className="card-body" style={{overflow: 'auto'}}>
        <form onSubmit={HandleSubmit}>
        
  <h5>Enviar Email</h5>
  
<label>Serviço de email: </label>
  <select name="host" value={host} onChange={(e) => setHost(e.target.value)} required className="form-select">
  <option value="">Selecione seu serviço de email</option>
  <option value="smtp.gmail.com">Gmail</option>
  <option value="smtp.live.com">Hotmail</option>
  <option value="SMTP.office365.com">Outlook</option>
  
  </select>


  <label>Meu Nome: </label> 
  <input name="from"
   value={from}
    type="text"
     required
     onChange={(e) => setFrom(e.target.value)}
      className="form-control"/>

  <label>Meu Email: </label>
  <input 
  onChange={(e) => setUser(e.target.value)}
  type="email"
   value={user}
    name="user"
     required
      className="form-control"/>
  
  <label>Senha Email: </label>
  <input 
  onChange={(e) => setPass(e.target.value)}
  type="password"
   name="pass"
    value={pass}
     required
      className="form-control"/>
  
  <label>Email Destinatário: </label>
  <input
  onChange={(e) => setTo(e.target.value)}
   type="email"
    name="to"
     required
     value={to}
      className="form-control"/>
  
  <label>Assunto: </label>
  <input
  onChange={(e) => setSubject(e.target.value)}
   type="text"
    name="subject"
     required 
     className="form-control"
     value={subject}
      placeholder="Digite o assunto"/>

  <label>Mensagem: </label>
  <textarea 
  onChange={(e) => setText(e.target.value)}
  required
    className="form-control"
    name="text"
    value={text}
     placeholder="Digite a mensagem"
     ></textarea>

     <label>Arquivo:</label>
     <input type="file" onChange={onFileChange} className="form-control"/>
  <br/>
  <button onClick={() =>  handleClose()} className="btn btn-danger">Fechar</button>
  <button type="submit" className="btn btn-success" style={{marginLeft: '8px'}}>
      {
          loading == true ? (
              <Loading/>
          ) : <span>Enviar</span>
      }
      </button>
  {
              sucMsg == true ? (
                  <div className="alert alert-success" role="alert">
                    Email Enviado!
                </div>
              ) : ''
          }

          {
              errMsg == true ? (
                  <div className="alert alert-danger" role="alert">
                    Email não enviado! Confira suas credenciais ou permissões do seu serviço de email
              </div>
              ) : ''
          }
  </form>
  </div>
  </div>
    )
}

export default PersistentRecep(SendEmailPaciente)

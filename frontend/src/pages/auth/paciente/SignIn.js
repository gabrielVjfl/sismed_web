import React, {useState, useContext} from 'react'

import {Container, Title, TemplateInputs, TitleLogo, Footer} from '../Style'

import { FaUser, FaEnvelope, faUser, FaKey} from 'react-icons/fa'

import Logo from '../../../assets/logo.png'

import Axios from 'axios'

import URL from '../../../api/URL'

import {useHistory} from 'react-router-dom'

import {PacienteContext} from '../../../services/context/contextApi/PacienteContext'

import Swal from 'sweetalert2'

const LoginPaciente = () => {


    const {dispatch: userDispatch} = useContext(PacienteContext)

    const history = useHistory()

const [email, setEmail] = useState('')

const [password, setPassword] = useState('')


const HandleLogin = async(e) => {
    try {
    e.preventDefault()

    let response = await Axios.post(`${URL}/pacientes/login`, {
        email:email,
        password:password
    })


    if(response.data.token) {
        console.log(response.data)

        localStorage.setItem('userDataPaciente', JSON.stringify(response.data.user))
        localStorage.setItem('pacienteToken', JSON.stringify(response.data.token))

        let resData = localStorage.getItem('userDataPaciente')
        let resToken = localStorage.getItem('pacienteToken')
    
        let jsonData = JSON.parse(resData)
        let jsonToken = JSON.parse(resToken)
    
        console.log('Meu localStorage', jsonData)

        Axios.defaults.headers.Authorization = `Bearer ${jsonToken}`

        userDispatch({
            type: 'SETuser',
            payload: {
                user: jsonData
            },
        })
        userDispatch({
            type: 'SETauth',
            payload: {
                auth: true
            }
        })
       userDispatch({
           type: 'SETtoken',
           payload: {
               token: jsonToken
           }
       })
       userDispatch({
           type: 'SETloading',
           payload: {
               loading: false
           }
       })

        history.push('/adm/paciente')
    }
    

    }
    catch(err) {
    console.log(err)
    
    Swal.fire({
        title: 'Ocorreu um erro!',
        text: err.response.data.errBackend,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}
    return (
    <Container color="#FF9F0F">
    
    <div className="main">
    <div className="container">
        <div className="row">
            <div className="col-md">
                <div className="card" 
                style={{height: '540px', width: '320px', backgroundColor: 'white',
                borderRadius: '20px'}}>
                    <div className="card-body" style={{display: 'flex', 
                    flexDirection: 'column', alignItems: 'center', margin: 0, justifyContent: 'center'}}>
                        <TitleLogo>Sismed</TitleLogo>
                <br/>
                
        <Title>Faça o seu login</Title>
        <br/>
                        <form onSubmit={HandleLogin} style={{width: '80%', 
        alignItems: 'center', display: 'flex', justifyContent: 'center',
        flexDirection: 'column'}}>
                      <FaEnvelope color="black" size={24}/>
            <br/>
        <input required autoFocus="on" value={email} name="email" 
        onChange={(e) => setEmail(e.target.value)}
        style={{width: '100%'}} className="form-control" type="email"
         placeholder="Digite o seu email"/>
        <br/>
         
        <FaKey color="black" size={24}/>
        <br/>
        <input style={{width: '100%'}} value={password} name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="form-control" type="password" placeholder="Digite a sua senha"/>
        <br/>
        <br/>
        <button  type="submit" 
        style={{width: '100%'}} className="btn btn-primary">Entrar</button>
        </form>
                    
                    </div> 

                </div>
                </div>
        </div>
    </div>
</div>
    
       
        
<Footer color="#FF9F0F">
    <p style={{color: 'white'}}>Powered by </p>
    <img src={Logo} width="130px"/>
</Footer>
    </Container>
    )
}
export default LoginPaciente
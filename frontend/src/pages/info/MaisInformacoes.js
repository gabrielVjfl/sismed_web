import React, {useState} from 'react';
import {Container, Title, TemplateInputs, TitleLogo, Footer} from '../auth/Style.js'
import { FaUserNurse, FaEnvelope, FaKey, FaEye, FaEyeSlash} from 'react-icons/fa'



import URL from '../../api/URL'

import Axios from 'axios'

import {useHistory} from 'react-router-dom'

const MaisInformacoes = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let HandleLogin = async(e) => {
        e.preventDefault()
        try {
        
        let response = await Axios.post(`${URL}/medicos/login`, {
            email:email,
            password:password
        })
    
     localStorage.setItem('userDataMedico', JSON.stringify(response.data))
    
    
      let resData = localStorage.getItem('userDataMedico')
    
        let json = JSON.parse(resData)
    
        console.log('Meu localStorage', json)
    
        console.log('Resposta da api', response)
        console.log('Token do usuario', response.data.token)
        console.log('Dados do usuario', response.data.user)
    
     
    
        setEmail('')
        setPassword('')
    
       // history.push('/adm/medico')
        
    
        }
        catch(err) {  
        console.log(err)
        alert('Deu erro!!!')
        }
    }

    return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', 
    position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black'}}>

<div className="main">
    <div className="container">
        <div className="row">
            <div className="col-md">
                <div className="card" 
                style={{height: '540px', width: '300px', backgroundColor: 'white'}}>
                    <div className="card-body" style={{display: 'flex', 
                    flexDirection: 'column', alignItems: 'center', margin: 0, justifyContent: 'center'}}>
                        <TitleLogo>Sismed</TitleLogo>
                <br/>
                
        <Title>Olá Médico!<FaUserNurse/> Faça o seu login</Title>
                        <form onSubmit={HandleLogin} style={{width: '80%', 
        alignItems: 'center', display: 'flex', justifyContent: 'center',
        flexDirection: 'column'}}>
                      <FaEnvelope color="white" size={24}/>
            <br/>
        <input required autoFocus="on" value={email} name="email" 
        onChange={(e) => setEmail(e.target.value)}
        style={{width: '100%'}} className="form-control" type="email"
         placeholder="Digite o seu email"/>
        <br/>
         
        <FaKey color="white" size={24}/>
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
    </div>
    )
}
export default MaisInformacoes
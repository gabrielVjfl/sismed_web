import React, {useState, useContext} from 'react'

import {Container, Title, TemplateInputs, TitleLogo, Footer} from '../Style'

import { FaFemale, FaEnvelope, FaKey} from 'react-icons/fa'

import Logo from '../../../assets/logo.png'

import URL from '../../../api/URL'

import Axios from 'axios'

import {useHistory} from 'react-router-dom'

import {RecepcionistaContext} from '../../../services/context/contextApi/RecepcionistaContext'

import Loading from '../../../utils/Loading.js'

import Swal from 'sweetalert2'
const LoginRecepcionista = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)
const history = useHistory()

const {dispatch: userDispatch} = useContext(RecepcionistaContext)



const HandleLogin = async(e) => {
    try {
        e.preventDefault()

        setLoading(true)

        let response = await Axios.post(`${URL}/recepcionista/login`, {
            email:email,
            password:password
        })

        if(response.data.token) {
            console.log(response.data)

            sessionStorage.setItem('userRecepData', JSON.stringify(response.data.user))
            sessionStorage.setItem('tokenRecep', JSON.stringify(response.data.token))

            let json = sessionStorage.getItem('userRecepData')
            let mytoken = sessionStorage.getItem('tokenRecep')

            let resJson = JSON.parse(json)
            let resToken = JSON.parse(mytoken)

            console.log('Meu dados', resJson)
            console.log('Meu token', resToken)
        
        Axios.defaults.headers.Authorization = `Bearer ${resToken}`

        userDispatch({
            type: 'SETauth',
            payload: {
            auth: sessionStorage.getItem('tokenRecep')
            }
        })

        userDispatch({
            type: 'SETtoken',
            payload: {
                token: resToken // ou response.data.token
            }

        })
        userDispatch({
            type: 'SETloading',
            payload: {
                loading: false
            }
        })
        userDispatch({
            type: 'SETdata',
            payload: {
                dados: resJson // ou response.data.user
            }
        })
        
            setEmail('')
            setPassword('')
    
            history.push('/adm/recepcionista')


        }

    }
    catch(err) {
   setLoading(false)
    Swal.fire({
        title: 'Ocorreu um erro!',
        text: err.response.data.errBackend,
        icon: 'error',
        confirmButtonText: 'Ok'
      })

    }
}


    return (
<Container color="#F800E7">
<div className="main">
    <div className="container">
        <div className="row">
            <div className="col-md">
                <div className="card" 
                style={{maxHeight: '60vh',
                 maxWidth: '70vw',
                 minHeight: '50vh', minWidth: '20vw',
                  backgroundColor: 'white',
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
        style={{width: '100%'}} className="btn btn-primary">{
            loading == true ? (
                 <Loading/> 
                  ) : <span>Entrar</span>
        }</button>
        </form>
                    
                    </div> 

                </div>
                </div>
        </div>
    </div>
</div>

<Footer color="#F800E7">
    <p style={{color: 'white'}}>Powered by </p>
    <img src={Logo} width="130px"/>
</Footer>
    </Container>
    )
}
export default LoginRecepcionista
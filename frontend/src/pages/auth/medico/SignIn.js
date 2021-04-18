import React, {useState, useContext, useEffect} from 'react'

import {Container, Title, TemplateInputs, TitleLogo, Footer} from '../Style'

import { FaUserNurse, FaEnvelope, FaKey, FaEye, FaEyeSlash} from 'react-icons/fa'

import Logo from '../../../assets/logo.png'

import URL from '../../../api/URL'

import Axios from 'axios'

import {useHistory} from 'react-router-dom'

import {UserContext} from '../../../services/context/contextApi/MedicoContext'

import Swal from 'sweetalert2'

import Loading from '../../../utils/Loading.js'

const LoginMedico = () => {

    const {dispatch: userDispatch} = useContext(UserContext)
    const {state: myuser} = useContext(UserContext)
   
    
    const history = useHistory()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)


let HandleLogin = async(e) => {
 
    try {
        e.preventDefault()

        setLoading(true)
    
    let response = await Axios.post(`${URL}/medicos/login`, {
        email:email,
        password:password
    })


    if(response.data.token) {

 sessionStorage.setItem('userDataMedico', JSON.stringify(response.data.user))
 sessionStorage.setItem('medicoToken', JSON.stringify(response.data.token))

  let resData = sessionStorage.getItem('userDataMedico')
  let resToken = sessionStorage.getItem('medicoToken')

    let jsonData = JSON.parse(resData)
    let jsonToken = JSON.parse(resToken)

   
    Axios.defaults.headers.Authorization = `Bearer ${jsonToken}`


userDispatch({
    type: 'SETtoken',
    payload: {
        token: jsonToken
    }
})
userDispatch({
 type: 'SETauth',
 payload: {
     auth: sessionStorage.getItem('medicoToken'),
 }
})
userDispatch({
type: 'SETloading',
payload: {
    loading: false
}
})
userDispatch({
type: 'SETdados',
payload: {
    dados: jsonData
}

})


setEmail('')
setPassword('')

history.push('/adm/medico')
setLoading(false)

}

}
    catch(err) {  

    Swal.fire({
        title: 'Ocorreu um erro!',
        text: err.response.data.errBackend,
        icon: 'error',
        confirmButtonText: 'Ok'
      })

      setLoading(false)

    }
}



    return (
        <div>
            <Container color="#23E060">
            
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
                
        <Title> Faça o seu login</Title>
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
        style={{width: '100%'}} className="btn btn-primary">
            {
                loading == true ? (

                    <Loading/>
                ) :  (
                <span>Entrar</span>
                )
            }
           
            </button>
        </form>
        <br/>

       
                    </div> 

                </div>
                </div>
        </div>
    </div>
</div>
    
       
        
<Footer color="#23E060">
    <p style={{color: 'white'}}>Powered by </p>
    <img src={Logo} width="130px"/>
</Footer>
            </Container>
        </div>
    )
}
export default LoginMedico
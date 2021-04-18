import React, {useEffect} from 'react'


import {
    Container, 
    ContainerTitle, 
    Title, 
    TitleLogo, 
    ContainerTitleLogo,
     ContainerContent,
     ContainerButtons,
     ContainerBtnInfo,
     ContainerEmpresa,
     Footer,
     BtnHome,
     Link
    } 
    from '../home/Styles'

    import Logo from '../../assets/logo.png'

    
   import {useHistory} from 'react-router-dom'

const Preload = () => {


    const history = useHistory()


    window.onload = function() {
        let tokenMedico = sessionStorage.getItem('medicoToken')
        let tokenRecep = sessionStorage.getItem('tokenRecep')
    
        if(tokenMedico) {
            history.push('/adm/medico')
        }
        else if(tokenRecep) {
           history.push('/adm/recepcionista')    
        }
        else {
            history.push('/')
        }
    }


    
    
   
    return (
        <Container>
    <ContainerTitleLogo>
         <TitleLogo>Sismed</TitleLogo>
    </ContainerTitleLogo>

<ContainerTitle>
        <Title>Seja Bem Vindo ao Melhor<br/> Sistema Médico do Brasil</Title>
</ContainerTitle>


<ContainerButtons>
<Link href="/medico/signin">
    <BtnHome color="#23E060" className="btn btn-primary"  id="btnsoumedico">Sou Médico</BtnHome>
</Link>

<Link href="/paciente/signin">
    <BtnHome color="#FF9F0F" className="btn btn-primary"  id="btnsoupaciente">Sou Paciente</BtnHome>
</Link>

<Link href="/recepcionista/signin">
    <BtnHome color="#F800E7" className="btn btn-primary">Sou Recepcionista</BtnHome>
</Link>
</ContainerButtons>



        </Container>
    )
}
export default Preload
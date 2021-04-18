import React, {useEffect} from 'react'
//import {Link} from 'react-router-dom'

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
    from './Styles'

    import Logo from '../../assets/logo.png'

    
   import {useHistory} from 'react-router-dom'

const Home = () => {

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
export default Home
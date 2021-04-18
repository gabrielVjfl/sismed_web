import React from 'react'

import styled from 'styled-components'



export const ContainerNav = styled.div`

`

export const TextSideBarHeader = styled.span`
font-family: 'Nunito';
font-weight: 600;
color: white;
margin-top: 10px;
font-size: 1em;
text-overflow: ellipsis;
overflow: hidden;
max-width: 100%;
`


export const ContainerSideBar = styled.nav`
background-color: #1E282C;
min-width: 250px;
max-width: 250px;
min-height: 100vh;
transition: all 0.3s;

`

export const ButtonDeslogar = styled.button`
margin-top: 15px;
`

export const HeaderSideBar = styled.header`
padding-top: 10px;
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
left: 10;
border-bottom: 2px solid white;


`
export const BtnSide = styled.button`
 position: absolute;
   margin-left: 160px;

`
export const TemplateProfile = styled.div`
display: flex;
flex-direction: row;
margin-left: 7px;
`

export const Nav = styled.nav`
height: 10%;
background-color: grey;


`
export const Hello = styled.span`
color: white;
font-size: 17px;
cursor: pointer;
position: absolute;
right: 0;
margin-right: 2vw;
`

export const TitleLogo = styled.p`
margin-left: 10px;
font-size: 25pt;
color: yellow;
font-weight: 800;
font-family: Nunito;

@media(max-width: 768px) {
    font-size: 26pt;
}
`

export const TemplateSideBar = styled.div`
padding: 10px;
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;

`

export const TemplateSideBarOption = styled.div`
display: flex;
flex-direction: row;
`

export const TitleSideBar = styled.span`
font-size: 19px;
font-family: 'Nunito';
font-weight: 600;
color: #31A17E;
cursor: pointer;
margin-top: 14px;
margin-right: 5px;
transition: all 0.7s;

&:hover {
    color: white;
    transition: all 0.7s
}

`



export const TitleCreate = styled.span`
font-size: 24px;
font-family: 'Nunito';
font-weight: 600;
color: yellow;
margin-top: 55px;
`

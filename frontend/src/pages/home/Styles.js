import React from 'react';

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex: 1;
align-items: center;
justify-content: center;
background-color: #2454E0;
min-height: 100vh;
min-width: 100%;
padding: 0;
flex-direction: row;
margin: 0;
overflow:auto;
@media(max-width: 969px) {
     flex-direction: column;
}
`
export const ContainerBtnInfo = styled.div`
right: 0;
top:0;
position: absolute;
width: 300px;
@media(max-width: 767px) {
  width: 40%;
}
`

export const ContainerTitleLogo = styled.div`
left: 0;
top: 0;
position: absolute;
margin-left: 80px;
margin-top: 30px;
padding: 0 30px;
align-items: center;
 justify-content: center;
 display: flex;
 @media(max-width: 769px) {
 margin-left: 0%;
 margin-top: 10px;
}
`

export const ContainerTitle = styled.div`
 align-items: center;
 justify-content: center;
 max-width: 450px;
 margin-right: 100px;
 display: flex;
 @media(max-width: 969px) {
     margin-right: 0px;
     margin-left: 0%;
     max-width: 250px;
     margin-top: 0px;
}
 

`
export const ContainerButtons = styled.div`
align-items: center;
justify-content: center;
display: flex;
@media(max-width: 969px) {
    flex-direction: column;
   
}
`

export const TitleLogo = styled.p`
font-size: 32pt;
color: yellow;
font-weight: 700;
font-family: Nunito, Arial, sans-serif;
display: flex;
@media(max-width: 768px) {
    font-size: 26pt;
}
`

export const Title = styled.h1`
font-size: 45pt;
font-weight: 800;
font-family: Nunito, Arial, sans-serif;
text-align: center;
color: white;
display: flex;
@media(max-width: 969px) {
     font-size: 26pt;
     margin-top: 0px;
 
}
@media(max-width: 350px) {
    font-size: 20pt;
}

`
export const Footer = styled.footer`
height: 110px;
width: 100%;
background-color: #2454E0;
align-items: center;
bottom: 0;
justify-content: center;
position: absolute;
right: 0;
left: 0;
display: flex;
`

export const BtnHome = styled.button`
 height: 60px;
  border-radius:  20px;
  font-weight: 600;
  align-items: center;
text-align: center;
display: flex;
width: 180px;
justify-content: center;
  font-size: 19px;
 margin-left: 10px;
 border: 2px solid black;
 background-color: ${props => `${props.color}`};
 transition: all 0.7s;
 @media(max-width: 969px) {
  font-size: 17px;
  width: 160px;
  margin-top: 6%;
  
 }
`
export const Link = styled.a`
list-style: none;
text-decoration: none;
`
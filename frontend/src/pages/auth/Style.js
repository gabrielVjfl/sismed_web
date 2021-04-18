import React from 'react';

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;

 min-width: 100vw;
 margin:0;
 padding:0;
 bottom: 0;
  min-height: 100vh;
max-width: 100vw;
max-height: 100vh;
background-color: ${props => `${props.color}`};

`
export const Title = styled.span`
font-size: 24px;
font-family: Nunito;
font-weight: 200;
color: black;
`

export const TemplateInputs = styled.div`
background-color: black;
height: 550px;
width: 500px;
align-items: center;
justify-content: center;
display: flex;
flex-direction: column;
border-radius: 20px;
border: 2px solid yellow;
bottom: 10;
z-index: 10;
position: relative;
box-sizing: border-box;
`
export const TitleLogo = styled.p`
font-size: 2em;
color: #2454E0;
font-weight: 700;
font-family: Nunito;
margin-top: -80px;
`

export const Footer = styled.footer`
height: 10%;
width: 100%;
background-color: ${props => `${props.color}`};
align-items: center;
bottom: 0;
justify-content: center;
margin:0;
display: flex;
position: fixed;

`

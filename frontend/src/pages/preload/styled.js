import React from 'react'

import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex: 1;
align-items: center;
justify-content: center;
background-color: #1E282C;
min-height: 100vh;
min-width: 100%;
padding: 0;
flex-direction: column;
margin: 0;
overflow:auto;

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



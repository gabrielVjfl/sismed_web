import React from 'react'

import styled from 'styled-components'

export const CardHeader = styled.div`
height: 40px;
background-color: ${props => `${props.color}`};
display: flex;
align-items: center;
justify-content: center;
font-family: 'Nunito';
font-weight: 700;
font-size: 18px;

`

export const TemplateError = styled.div`
display: flex;
justify-content: center;
`

export const MessageError = styled.span`
font-size: 21px;
font-family: 'Nunito';
font-weight: 600;

`

export const MyTable = styled.table`
border: 4;
align-items: center;
width: 78vw;


th: {
align-items: center;
text-align: center;
font-family: 'Nunito';
font-weight: 700;

}
tr: {
align-items: center;
text-align: center;
}
td {
    font-family: 'Nunito';
    font-weight: 600;
    border-bottom: 2px solid black;
    max-width: 110px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 6px;
    padding-right: 5px;

    button {
        font-family: 'Nunito';
    font-weight: 700;
    color: black;

    }
    
}

`
export const Pagination = styled.div`
display: flex;
width: 50%;
height: 50px;


align-items: center;
justify-content: center;
`

export const PaginationButton = styled.div`
display: flex;
`

export const PaginationItem = styled.div`

`
import React, {useState, useEffect, useContext} from 'react'


import Axios from "axios";

import { RecepcionistaContext } from "../../services/context/contextApi/RecepcionistaContext";

import PersistentRecep from '../../utils/persist/PersistentRecep'
import "../styles/style.css";



import URL from '../../utils/URL'

import {Link, useHistory} from 'react-router-dom'
const InfoMedico = () => {

    const {state:state} = useContext(RecepcionistaContext)

    const [list, setList] = useState([])

    useEffect(() => {
        HandleGetList()
    }, [])

    useEffect(() => {
        HandleGetList()
    }, [state.dados.id])



    const HandleGetList = async() => {
        try {
        let response = await Axios.get(`${URL}/recepcionista/listarparams/${state.dados.id}`)

        console.log('Minha resposta', response.data)

        setList(response.data)
        }
        catch(err) {}
    }

    return (
    <div>
    {
        list.map((list) => 
        <div key={list.id} style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: '20px'}}>Nome : {list.Medico.name}</span><br/>
            <span style={{fontSize: '20px'}}>Email : {list.Medico.email}</span>
            <br/>
            <button className="btn btn-primary">Enviar Email</button>
            <br/>
            <button className="btn btn-warning">Chat</button>
        </div>
        )
    }
    </div>
    )
}
export default PersistentRecep(InfoMedico)
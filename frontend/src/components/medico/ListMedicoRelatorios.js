import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import { UserContext } from "../../services/context/contextApi/MedicoContext";

import URL from '../../utils/URL'

import { Table } from 'react-bootstrap'

import {FaTrash} from 'react-icons/fa'

import {
    CardHeader,
    TemplateError,
    MessageError,
    MyTable,
    Pagination,
    PaginationButton,
    PaginationItem,
  } from "../styles/styled.js";

const ListMedicoRelatorios = () => {

    const {state} = useContext(UserContext)



    const [relatorios, setRelatorios] = useState([])

    const [description, setDescription] = useState('')

    useEffect(() => {
        HandleGetRelatorios()
    }, [])

    useEffect(() => {

        HandleGetRelatorios()
    
    }, [description])

    useEffect(() => {
        HandleGetRelatorios()
    }, [state.dados.id])


    const HandleGetRelatorios = async() => {
        try {

        let response = await axios.get(`${URL}/relatorios/list/filter/${state.dados.id}?search=${description}`)
 
        console.log(response)

        setRelatorios(
        response.data
        )

        }
        catch(err) {
            console.log(err)
        }
    }


   
      return (
      
      <div className="card" style={{maxWidth: '90%'}}>
      <CardHeader color="orange" class="card-header">
              Relatórios | Total {relatorios.length}
            </CardHeader>
            <input className="form-control"
            onChange={(e) => setDescription(e.target.value)}
             placeholder="Pesquise pela descrição..."/>
          <div className="card-body">
          <div className="table-responsive">
            <Table id="mytable" Table responsive="md" striped bordered hover>
                <thead>
               <tr>
                   <th>Descrição</th>
                   <th>Medicamentos</th>
                   <th>Arquivos (clique para ver)</th>
                   <th>Paciente</th>
                   <th>Email</th>
                   <th>Telefone</th>
                   <th>Deletar</th>
               </tr>
                </thead>

                {
                    relatorios.map(item => 
                        <tbody>
                            <tr key={item.id}>
                            <td>{item.descricao}</td>
                            <td>{item.medicamentos}</td>
                            <td style={{width: "120px", height: "80px"}}>
                        <a target="_blank" href={item.url}><img alt={item.url} 
                        src={item.url} height="100%" width="100%"/></a>
                            </td>
                            <td>{item.Paciente.name}</td>
                            <td>{item.Paciente.email}</td>
                            <td>{item.Paciente.telefone}</td>
                            <td>
                                <button className="btn btn-danger">
                                    <FaTrash size={19} color="white"/>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                        )
                }

                </Table>
          </div>

      </div>
      </div>
      )
}
export default ListMedicoRelatorios
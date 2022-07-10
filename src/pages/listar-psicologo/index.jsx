import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useParams } from "react-router-dom";

import Card from "../../components/Card";
import { Header } from "../../components/Header";
import { SecMain } from "./styles";
import  API  from "../../services/api";
import { UserContext } from "../../providers/user";
import axios from "axios";

function ListarPsicologo() {

  const {usuario} = useContext(UserContext)

  const [pessoa,setPessoa] = useState({})
  const [paciente,setPaciente] = useState({})

  const params = useParams()

  const { id } = params 

  const {accessToken} = usuario
  console.log(usuario);

  useEffect(()=>{
    
    axios.get(`https://api-callmind.herokuapp.com/psychologists?userId=${id}`,{
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((resp)=> setPessoa(resp.data[0]))
    .catch((err)=> console.log(err))
  },[])

  useEffect(()=>{
    
    API.get(`/patients?userId=${usuario.id}`)
    .then((resp)=> setPaciente(resp.data[0]))
    .catch((err)=> console.log(err))
  },[])

  return <SecMain>
    <Header type={"dashBoard"} user={paciente}/>
    <div className="alinhamento">
      <section className="container">
        <Card 
          type={"psicologo"} 
          pessoa={pessoa}
          maxSizeY="70vh"
          />
      </section>
      <section className="agenda">
          <header>
            <h3>Agenda</h3>
          </header>
          <div className="calendario">
            <Calendar />
          </div>        
      </section>
    </div>
  </SecMain>;
}

export default ListarPsicologo;

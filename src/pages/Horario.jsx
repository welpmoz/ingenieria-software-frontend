import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import base64 from 'base-64'
import { Table } from "react-bootstrap"
import { useCookies } from "react-cookie"
import "../components/horario.css";
import axios from "axios"
import CargaAlumnos from "../components/CargaAlumnos"
import Appbar from "../components/Appbar"


export default function Horario() {
  const [cookies, setCookies, removeCookies] = useCookies(null)
  const [horarios, setHorarios] = useState([])
  // const [error, setError] = useState(null)
  const navigate = useNavigate()
  let { curso } = useParams()
  const username = cookies.username
  const password = cookies.password
  const is_staff = cookies.is_staff
  const location = useLocation()
  const { codigo, grupo, id } = location.state

  const getHorariosAxios = async() => {
    try {
      const response = await axios.get(`http://localhost:8000/api/horarios/?grupo=${grupo}&codigocurso=${codigo}`, {
        headers: {
          'Content-Type':'application/json',
        },
        auth: {
          username,
          password
        }
      })
      const { data } = response
      setHorarios(data)
    }
    catch (err) {
      console.log('error en horarios', err)
    }
  }

  useEffect(() => {
    getHorariosAxios()
  }, [])

  return (
    <div className="horario">
      <Appbar page='Horarios' />
      <h1 className="prro">{ curso }</h1>
      <button className="btn" onClick={() => navigate(-1)}>Back</button>
      <Table className="table-custom striped bordered hover">
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Aula</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {
            horarios?.map((horario, index) => (
              <tr key={index}>
                <th>{ horario.dia }</th>
                <th>{ horario.hi }</th>
                <th>{ horario.hf }</th>
                <th>{ horario.aula }</th>
                <th>{ horario.tipo }</th>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <CargaAlumnos codigocurso={codigo} grupo={grupo} />
    </div>
  )
}
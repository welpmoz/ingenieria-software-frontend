import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import base64 from 'base-64'
import { Table } from "react-bootstrap"
import { useCookies } from "react-cookie"
import "../components/horario.css";


export default function Horario() {
  const [cookies, setCookies, removeCookies] = useCookies(null)
  const [horarios, setHorarios] = useState([])
  const navigate = useNavigate()
  let { curso } = useParams()
  const username = cookies.username
  const password = cookies.password
  const docente = cookies.firstName
  // console.log(username, password, docente)
  const location = useLocation()
  let { carrera, grupo } = location.state
  curso = curso.replace(' ', '+')
  carrera = carrera.replace(' ', '+')

  const getHorarios = async() => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + base64.encode(username+':'+password))
    try {
      const response = await fetch(
          `http://localhost:8000/api/horarios/?docente=${docente}&grupo=${grupo}&carrera=${carrera}&curso=${curso}`, {
        method: 'GET',
        headers: headers,
      })
      const data = await response.json()
      setHorarios(data)
    }
    catch (err) {
      console.log('ocurrio un error en horarios', err)
    }
  }

  useEffect(() => {
    getHorarios()
  }, [])

  return (
    // <div>Horario</div>
    <div className="horario">
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
    </div>
  )
}
import { useEffect } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios"

export default function CursosDocente() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password
  const [misCursos, setMisCursos] = useState([])
  const navigate = useNavigate()
  const { docente } = useParams()

  const getData = async() => {
    const response = await axios.get(`http://localhost:8000/api/cursos/?docente=${docente}`, {
      headers: { 'Content-Type':'application/json' },
      auth: {
        username,
        password
      }
    })
    const { data } = response
    setMisCursos(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h1>Cursos de { docente }</h1>
      <button onClick={() => navigate(-1)}>Volver</button>
      <Table className="table-custom striped bordered hover">
        <thead>
          <tr>
            <th>Código</th>
            <th>Curso</th>
            <th>Carrera</th>
            <th>Grupo</th>
            <th>Sílabo</th>
          </tr>
        </thead>
        <tbody>
          {
            misCursos?.map((miCurso, index) => (
              <tr key={index}>
                <th>{miCurso.codigo}</th>
                <th>{miCurso.denominacion}</th>
                <th>{miCurso.carrera}</th>
                <th>{miCurso.grupo}</th>
                <th>{miCurso.silabo_url ? 'si':'no'}</th>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
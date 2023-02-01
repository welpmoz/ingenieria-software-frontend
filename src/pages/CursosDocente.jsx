import { useEffect } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import Appbar from "../components/Appbar"

import base64 from 'base-64'

export default function CursosDocente() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password
  const [misCursos, setMisCursos] = useState([])
  // const navigate = useNavigate()
  const { docente } = useParams()
  console.log(docente)
  const docente2 = docente.replaceAll(' ', '+')
  console.log('docente2', docente2)

  const getData = async() => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + base64.encode(username+':'+password))
    try {
      const response = await fetch(
        `http://localhost:8000/api/cursos/?docente=${docente}`, {
          method: 'GET',
          headers:headers,
        }
      )
      const data = await response.json()
      console.log(data)
      setMisCursos(data)
    }
    catch (err) {
      console.log('ocurrio un error al obtener mis cursos', err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h1>Cursos de { docente }</h1>
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
                <th>{miCurso.silabo ? 'si':'no'}</th>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
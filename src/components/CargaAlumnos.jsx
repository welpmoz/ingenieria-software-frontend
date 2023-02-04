import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useCookies } from "react-cookie"
import Appbar from "./Appbar"

export default function CargaAlumnos({ codigocurso, grupo }) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password

  const [alumnos, setAlumnos] = useState([])

  const getAlumnos = async() => {
    const response = await axios({
      method:'GET',
      url:`http://localhost:8000/api/matriculas/?codigocurso=${codigocurso}&grupo=${grupo}`,
      headers: { 'Content-Type':'application/json' },
      auth:{
        username,
        password
      }
    })
    const { data } = response
    setAlumnos(data)
  }

  useEffect(() => {
    getAlumnos()
  }, [])

  // post lista de alumnos
  const subirLista = async(e) => {
    e.preventDefault()
    const lista = document.getElementById('cargaalumnos').files[0]
    const formData = new FormData()
    formData.append('codigocurso', codigocurso)
    formData.append('grupo', grupo)
    formData.append('archivo_url', lista, lista.name)
    const response = await axios({
      method:'post',
      url:`http://localhost:8000/api/carga_alumnos/?codigocurso=${codigocurso}&grupo=${grupo}`,
      headers: { 'Content-Type':'multipart/form-data' },
      data: formData,
      auth: {
        username,
        password
      }
    })
    getAlumnos()
  }

  return (
    <div className="form-alumnos">
      {(alumnos.length === 0) &&
        <>
          <h3>Todavia no tienes alumnos registrados.</h3>
          <form>
            <input type='file' id="cargaalumnos" />
            <br />
            <input type='submit' onClick={subirLista}/>
          </form>
        </>
      }
      {(alumnos.length !== 0) &&
        <>
          <Table className="table-custom striped bordered hover">
            <thead>
              <tr>
                <th colSpan={4}>Alumnos</th>
              </tr>
              <tr>
                <th>N°</th>
                <th>Código</th>
                <th>Nombres y apellidos</th>
                <th>Presente</th>
              </tr>
            </thead>
            <tbody>
              {
                alumnos.map((alumno, index) => {
                  return (
                    <tr key={ index + 1 }>
                      <td>{ index }</td>
                      <td>{ alumno.codigoalumno }</td>
                      <td>{ alumno.nombre }</td>
                      <td><input type='checkbox' /></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </>
      }
    </div>
  )
}
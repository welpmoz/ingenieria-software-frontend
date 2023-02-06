import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useCookies } from "react-cookie"

export default function CargaAlumnos({ codigocurso, grupo, id }) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password

  const [alumnos, setAlumnos] = useState([])
  const [isPost, setIsPost] = useState(true)

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
    if (data.length !== 0)
      setIsPost(false)
    setAlumnos(data)
    console.log(isPost)
  }

  useEffect(() => {
    getAlumnos()
  }, [])

  const generaForm = () => {
    const lista = document.getElementById('cargaalumnos').files[0]
    const formData = new FormData()
    formData.append('codigocurso', codigocurso)
    formData.append('grupo', grupo)
    formData.append('archivo_url', lista, lista.name)
    return formData
  }

  // post lista de alumnos
  const subirLista = async(e) => {
    e.preventDefault()
    const formData = generaForm()
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

  const sendAsistencia = async(index, id, fecha) => {
    const check = document.getElementById(`asistencia${index}`)
    const obs = document.getElementById(`obs${index}`)
    const formData = new FormData()
    formData.append('presente', check.checked)
    formData.append('observacion', obs.value)
    formData.append('idmatricula', id)
    //formData.append('fecha', (new Date()).toLocaleString)
    formData.append('fecha', fecha)
    const reponse = axios({
      method:'post',
      url:`http://localhost:8000/api/asistencias/`,
      headers: { 'Content-Type':'application/json' },
      auth: {
        username,
        password
      },
      data:formData,
    })
  }

  const subirAsistencia = async(e) => {
    const fecha = new Date('1995-12-17');
    await alumnos.forEach((alumno, index) => {
      // console.log(index, alumno)
      sendAsistencia(index, alumno.id, fecha)
    })
    alert('Asistencia guardada correctamente.')
    window.location.reload()
  }

  return (
    <div className="form-alumnos">
      {(alumnos.length === 0) ? <h3>Todavia no tienes alumnos registrados.</h3> : <h3>Subir nueva lista de alumnos.</h3>}
      <form>
        <input type='file' id="cargaalumnos" />
        <br />
        <input type='submit' onClick={subirLista} />
      </form>
      {(alumnos.length !== 0) &&
        <>
          <Table className="table-custom striped bordered hover">
            <thead>
              <tr>
                <th colSpan={5}>Alumnos</th>
              </tr>
              <tr>
                <th>N°</th>
                <th>Código</th>
                <th>Nombres y apellidos</th>
                <th>Presente</th>
                <th>Observacion</th>
              </tr>
            </thead>
            <tbody>
              {
                alumnos.map((alumno, index) => {
                  return (
                    <tr key={ index }>
                      <td>{ index + 1 }</td>
                      <td>{ alumno.codigoalumno }</td>
                      <td>{ alumno.nombre }</td>
                      <td><input type='checkbox' id={`asistencia${index}`} /></td>
                      <td><input type='text' id={`obs${index}`} /></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <button className="btn" onClick={subirAsistencia}>Guardar Asistencia</button>
        </>
      }
    </div>
  )
}
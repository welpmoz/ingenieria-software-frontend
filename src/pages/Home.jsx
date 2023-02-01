//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import { Container, Row, Col, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
import Appbar from '../components/Appbar';
import { Table } from 'react-bootstrap';

import base64 from 'base-64'

import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Auth from './Auth';
import '../components/home.css';

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password
  const first_name = cookies.firstName
  const isStaff = cookies.isStaff

  const [cursos, setCursos] = useState(null)
  const [formsSilabo, setFormsSilabo] = useState([])

  const getData = async() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + base64.encode(username+':'+password))
    try {
      const response = await fetch(`http://localhost:8000/api/cursos/?docente=${first_name}`, {
        method: 'GET',
        headers: headers,
      })
      const data = await response.json()
      setCursos(data)
    }
    catch (err) {
      console.log('ocurrio un error en cursos', err)
    }
  }

  const subirSilabo = async(e, i, curso) => {
    e.preventDefault()
    console.log(e.target.id)
    const f = document.getElementById(`file${i}`).files[0];
    console.log(f)
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Basic ' + base64.encode(username+':'+password))
      const response = await fetch(`http://localhost:8000/api/silabos/${curso}/`, {
        method:'POST',
        headers:headers,
        body: {'silabo':f},
      })
      console.log(response)
    }
    catch (err) {
      console.log('ocurrio un error al subir silabo', err)
    }
  }
  // hook effect
  useEffect(() => {
    getData()
  }, [])


  return (
    <div className='app'>
      { !username && <Auth />}
      { username &&
        <>
          <Appbar username={username} isAdmin={isStaff} />
          <Table className="table-custom striped bordered hover">
            <thead>
              <tr>
                <th>Código</th>
                <th>Curso</th>
                <th>Carrera</th>
                <th>Créditos</th>
                <th>Grupo</th>
                <th>Matriculados</th>
                <th>Sílabo</th>
              </tr>
            </thead>
            <tbody>
              {
                cursos?.map((curso, index) => {
                  return (
                    <tr key={index}>
                      <th>{ curso.codigo }</th>
                      <th>
                        <Link to={`/${curso.denominacion}`}
                          state={{ carrera:curso.carrera, grupo:curso.grupo }}>
                            {curso.denominacion}
                        </Link>
                      </th>
                      <th>{ curso.carrera }</th>
                      <th>{ curso.creditos }</th>
                      <th>{ curso.grupo }</th>
                      <th>{ curso.matriculados }</th>
                      <th>
                        <form id={`form${index}`}>
                          <input type='file' id={`file${index}`} multiple/>
                          <input type='submit' id={`submit${index}`} onClick={e => subirSilabo(e, index, curso.denominacion)}/>
                        </form>
                      </th>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </>}
    </div>
  );
}

export default Home;
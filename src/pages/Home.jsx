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

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password
  const first_name = cookies.firstName

  const [cursos, setCursos] = useState(null)

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
      //console.log(data)
      setCursos(data)
    }
    catch (err) {
      console.log('ocurrio un error en cursos', err)
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
          <Appbar username={username} />
          <Table striped bordered hover>
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
                cursos?.map((curso, index) => (
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
                    <th>{ curso.silabo }</th>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </>}
    </div>
  );
}

export default Home;
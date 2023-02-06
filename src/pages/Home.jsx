import '../components/home.css';

import { useEffect, useState } from 'react';

import Appbar from '../components/Appbar';
import { Table } from 'react-bootstrap';
import Auth from './Auth';

import { useCookies } from 'react-cookie';

import axios from 'axios'
import Curso from '../components/Curso';

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password
  const is_staff = cookies.is_staff

  const [cursos, setCursos] = useState(null)

  const getDataAxios = async() => {
    const response = await axios.get(`http://localhost:8000/api/cursos/`, {
      headers: {
        'Content-Type':'application/json',
      },
      auth:{
        username,
        password
      }
    })
    const { data } = response
    setCursos(data)
  }

  // hook effect
  useEffect(() => {
    getDataAxios()
  }, [])


  return (
    <div className='app'>
      { !username && <Auth />}
      { username &&
        <>
          <Appbar username={username} isAdmin={is_staff} page='Cursos'/>
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
                  return <Curso key={index} index={index} {...curso}/>
                })
              }
            </tbody>
          </Table>
        </>}
    </div>
  );
}

export default Home;
import { useState } from "react";
import { useCookies } from "react-cookie";

import base64 from 'base-64'
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Docentes() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password
  const navigate = useNavigate()

  const [docentes, setDocentes] = useState(null)

  const getData = async() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic ' + base64.encode(username+':'+password))
    try {
      const response = await fetch('http://localhost:8000/api/docentes/', {
        method: 'GET',
        headers: headers,
      })
      const data = await response.json()
      setDocentes(data)
    }
    catch (err) {
      console.log('ocurrio un error en docentes', err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="docentes">
      <button className="btn" onClick={() => navigate(-1)}>Back</button>
      <Table className="table-custom striped bordered hover">
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {
            docentes?.map((docente, index) => (
              <tr key={index}>
                <th>
                  <Link to={`/docentes/${docente.nombre}`}>{ docente.nombre }</Link>
                </th>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
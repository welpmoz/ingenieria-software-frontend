import { useState } from "react";
import { useCookies } from "react-cookie";

import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import axios from "axios";

export default function Docentes() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const password = cookies.password
  const navigate = useNavigate()

  const [docentes, setDocentes] = useState(null)

  const getData = async() => {
    const response = await axios.get(`http://localhost:8000/api/docentes/`, {
      headers: { 'Content-Type':'application/json' },
      auth: {
        username,
        password
      }
    })
    const { data } = response
    setDocentes(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="docentes">
      <Appbar isAdmin={true} page='Docentes' username={username} />
      <button onClick={() => navigate(-1)}>Back</button>
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
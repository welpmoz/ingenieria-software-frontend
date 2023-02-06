import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function Curso({
    index, codigo, denominacion, grupo,
    carrera, creditos, matriculados,
    silabo_url, id }) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [miSilabo, setMiSilabo] = useState(silabo_url)
  const username = cookies.username
  const password = cookies.password
  const first_name = cookies.first_name
  const is_staff = cookies.is_staff

  const subirSilabo = async(e) => {
    e.preventDefault()
    const miArchivo = document.getElementById(`file${index}`).files[0]
    const formData = new FormData()
    formData.append('denominacion', denominacion); formData.append('creditos', creditos)
    formData.append('codigo', codigo); formData.append('grupo', grupo)
    formData.append('matriculados', matriculados); formData.append('carrera', carrera)
    formData.append('docente', first_name); formData.append('silabo_url', miArchivo, miArchivo.name)
    const response = await axios({
      method:'put',
      url:`http://localhost:8000/api/cursos/${id}/`,
      headers: { 'Content-Type':'multipart/form-data' },
      data:formData,
      auth:{
        username,
        password
      }
    })
    // console.log(response.data)
    // silabo = miSilabo
    setMiSilabo(response.data.silabo_url)
  }

  return (
    <tr>
      <th>{ codigo }</th>
      <th>
        <Link to={`/${denominacion}`}
          state={{ codigo, grupo, id }}>
          { denominacion }
        </Link>
      </th>
      <th>{ carrera }</th>
      <th>{ creditos }</th>
      <th>{ grupo }</th>
      <th>{ matriculados }</th>
      <th>
        <div>
          <input type='file' id={`file${index}`} multiple />
          <input type='submit' id={`submit${index}`} onClick={subirSilabo} />
        </div>
        {miSilabo &&
          <div><a href={miSilabo}>{miSilabo}</a></div>
        }
      </th>
    </tr>
  )
}
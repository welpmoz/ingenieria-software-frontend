export default function Alumno({ id, codigo, nombre, index }) {
  return (
    <>
      <td>{ index + 1 }</td>
      <td>{ codigo }</td>
      <td>{ nombre }</td>
      <td><input type='checkbox' id={`asistencia${index}`} /></td>
    </>
  )
}
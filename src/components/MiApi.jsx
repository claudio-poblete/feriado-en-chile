import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const MiApi = () => {
  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.boostr.cl/feriados/en.json')
        if (!response.ok) {
          throw new Error('No se pueden cargar los feriados, prueba más tarde')
        }
        const data = await response.json()
        if (!data?.data) {
          throw new Error('Formato de datos incorrecto')
        }

        const holidaysArray = data.data.map((holiday) => ({
          id: uuidv4(), // Generar un UUID único
          title: holiday.title,
          date: formatDate(holiday.date),
          type: holiday.type || '',
          inalienable: holiday.inalienable || false
        }))

        console.log(holidaysArray)
        setHolidays(holidaysArray)
        setLoading(false)
      } catch (error) {
        console.error('Error al traer los datos: ', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }
  return (
    <>
      <h2>Feriados de Chile 2024</h2>
      {loading
        ? (
          <p>Cargando...</p>
          )
        : (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Irrenunciable</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday) => (
                <tr key={holiday.id}>
                  <td>{holiday.title}</td>
                  <td>{holiday.date}</td>
                  <td>{holiday.type}</td>
                  <td>{holiday.inalienable ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
    </>
  )
}

export default MiApi

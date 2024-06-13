import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../styles/mi-api.css'

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
    <section id='showHolidays' className='show__holidays-section'>
      <h2 className='show__holidays-title'>Feriados <span className='first__span'>de Chile</span> <span className='second__span'>2024</span></h2>
      {loading
        ? (
          <p className='show__holidays-loading'>Cargando...</p>
          )
        : (
          <table className='show__holidays-table'>
            <thead>
              <tr className='table__row-container'>
                <th className='table__row'>Nombre del Feriado</th>
                <th className='table__row'>Fecha</th>
                <th className='table__row'>Tipo</th>
                <th className='table__row'>Irrenunciable</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday) => (
                <tr key={holiday.id} className='table__column-container'>
                  <td className='table__column'>{holiday.title}</td>
                  <td className='table__column'>{holiday.date}</td>
                  <td className='table__column'>{holiday.type}</td>
                  <td className='table__column'>{holiday.inalienable ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
    </section>
  )
}

export default MiApi

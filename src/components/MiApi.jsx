import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../styles/mi-api.css'

const MiApi = () => {
  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState({
    month: 'all',
    type: 'all',
    irrenunciable: 'all'
  })

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
    const [year, month, day] = dateString.split('-')
    return `${day}-${month}-${year}`
  }

  // Función para filtrar y ordenar los feriados
  const filteredHolidays = holidays.filter((holiday) => {
    // Filtrar por mes
    if (filterOptions.month !== 'all') {
      const holidayMonth = holiday.date.split('-')[1]
      if (holidayMonth !== filterOptions.month) {
        return false
      }
    }

    // Filtrar por tipo (religioso, civil o ambos)
    if (filterOptions.type !== 'all') {
      if (filterOptions.type !== holiday.type) {
        return false
      }
    }

    // Filtrar por irrenunciable
    if (filterOptions.irrenunciable !== 'all') {
      const irrenunciableValue = filterOptions.irrenunciable === 'true'
      if (irrenunciableValue !== holiday.inalienable) {
        return false
      }
    }

    return true
  })

  // Función para manejar cambios en el filtro de opciones
  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilterOptions({
      ...filterOptions,
      [name]: value
    })
  }

  return (
    <section id='showHolidays' className='show__holidays-section'>
      <h2 className='show__holidays-title'>Feriados <span className='first__span'>de Chile</span> <span className='second__span'>2024</span></h2>
      <div className='filter__container'>
        <div className='filter__item'>
          <label htmlFor='monthFilter'>Filtrar por mes:</label>
          <select
            id='monthFilter'
            name='month'
            value={filterOptions.month}
            onChange={handleFilterChange}
          >
            <option value='all'>Todos</option>
            <option value='01'>Enero</option>
            <option value='02'>Febrero</option>
            <option value='03'>Marzo</option>
            <option value='04'>Abril</option>
            <option value='05'>Mayo</option>
            <option value='06'>Junio</option>
            <option value='07'>Julio</option>
            <option value='08'>Agosto</option>
            <option value='09'>Septiembre</option>
            <option value='10'>Octubre</option>
            <option value='11'>Noviembre</option>
            <option value='12'>Diciembre</option>
          </select>
        </div>

        <div className='filter__item'>
          <label htmlFor='typeFilter'>Filtrar por tipo:</label>
          <select
            id='typeFilter'
            name='type'
            value={filterOptions.type}
            onChange={handleFilterChange}
          >
            <option value='all'>Todos</option>
            <option value='Religioso'>Religioso</option>
            <option value='Civil'>Civil</option>
          </select>
        </div>

        <div className='filter__item'>
          <label htmlFor='irrenunciableFilter'>Filtrar por irrenunciable:</label>
          <select
            id='irrenunciableFilter'
            name='irrenunciable'
            value={filterOptions.irrenunciable}
            onChange={handleFilterChange}
          >
            <option value='all'>Todos</option>
            <option value='true'>Sí</option>
            <option value='false'>No</option>
          </select>
        </div>
      </div>

      {loading
        ? (
          <p className='loading__container'>Cargando feriados...</p>
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
              {filteredHolidays.length > 0
                ? (
                    filteredHolidays.map((holiday) => (
                      <tr key={holiday.id} className='table__column-container'>
                        <td className='table__column'>{holiday.title}</td>
                        <td className='table__column'>{holiday.date}</td>
                        <td className='table__column'>{holiday.type}</td>
                        <td className='table__column'>{holiday.inalienable ? 'Sí' : 'No'}</td>
                      </tr>
                    ))
                  )
                : (
                  <tr>
                    <td colSpan='4' className='table__column'>No se encontraron feriados con los filtros seleccionados.</td>
                  </tr>
                  )}
            </tbody>
          </table>
          )}
    </section>
  )
}

export default MiApi

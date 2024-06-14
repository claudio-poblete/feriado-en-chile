import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../styles/buscador.css'

const Buscador = () => {
  const [search, setSearch] = useState('')
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
          id: uuidv4(),
          title: holiday.title,
          date: formatDate(holiday.date),
          type: holiday.type || '',
          inalienable: holiday.inalienable || false
        }))
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

  const filteredHolidays = holidays.filter((holiday) => {
    const normalizedSearch = normalizeString(search.trim())
    const normalizedTitle = normalizeString(holiday.title)
    const normalizedDate = normalizeString(holiday.date)
    return (
      normalizedTitle.includes(normalizedSearch) ||
      normalizedDate.includes(normalizedSearch)
    )
  })

  return (
    <section id='searchHolidays' className='search__holidays-section'>
      <h2 className='search__holidays-title'>Encuentra <span className='first__span'>el feriado</span> <span className='second__span'>que necesitas</span></h2>
      {loading
        ? (
          <p className='loading__container'>Cargando feriados...</p>
          )
        : (
          <div className='search__container'>
            <form className='search__form-container'>
              <input
                type='text'
                className='search__input'
                placeholder='Busca tu feriado por nombre o fecha (DD-MM-YYYY)...'
                value={search}
                onChange={handleSearchChange}
              />
            </form>
            {search && (
              <table className='holidays__table'>
                <thead>
                  <tr>
                    <th className='table__head'>Nombre</th>
                    <th className='table__head'>Fecha</th>
                    <th className='table__head'>Tipo de feriado</th>
                    <th className='table__head'>Irrenunciable</th>
                  </tr>
                </thead>
                <TransitionGroup component='tbody'>
                  {filteredHolidays.length > 0
                    ? (
                        filteredHolidays.map((holiday) => (
                          <CSSTransition key={holiday.id} timeout={500} classNames='fade'>
                            <tr>
                              <td className='table__data'>{holiday.title}</td>
                              <td className='table__data'>{holiday.date}</td>
                              <td className='table__data'>{holiday.type}</td>
                              <td className='table__data'>{holiday.inalienable ? 'Sí' : 'No'}</td>
                            </tr>
                          </CSSTransition>
                        ))
                      )
                    : (
                      <CSSTransition timeout={500} classNames='fade'>
                        <tr>
                          <td colSpan='4'>No se encontraron feriados</td>
                        </tr>
                      </CSSTransition>
                      )}
                </TransitionGroup>
              </table>
            )}
          </div>
          )}
    </section>
  )
}

export default Buscador

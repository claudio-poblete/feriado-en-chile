import '../styles/mi-api.css'

const Filter = ({ filterOptions, handleFilterChange }) => {
  return (
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
  )
}

export default Filter

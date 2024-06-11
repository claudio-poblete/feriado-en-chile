function App () {
  return (
    <header>
      <nav>
        <div className='logo__container'>
          <a href='#home' className='logo'>Feriados en Chile</a>
        </div>
        <ul className='nav__list-container'>
          <li className='list__link'>
            <a href='#inicio' className='link'>
              Inicio
            </a>
          </li>
          <li className='list__link'>
            <a href='#verFeriados' className='link'>
              Ver Feriados
            </a>
          </li>
          <li className='list__link'>
            <a href='#buscarFeriado' className='link'>
              Buscar Feriado
            </a>
          </li>
        </ul>
      </nav>
      <section className='hero__section'>
        <div className='hero__title-container'>
          <h2>Feriados</h2>
          <h2>en <span>Chile</span></h2>
        </div>
        <div className='hero__button_container'>
          <a className='primary__button' href='#verFeriados'>
            Todos los feriados
          </a>
          <a className='secondary__button' href='buscarFeriado'>
            Buscar Feriados
          </a>
        </div>
      </section>
    </header>

  )
}

export default App

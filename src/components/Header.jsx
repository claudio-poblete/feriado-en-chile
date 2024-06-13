import '../styles/header.css'

const Header = () => {
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
    </header>
  )
}

export default Header

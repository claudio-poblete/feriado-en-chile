import '../styles/header.css'
import { useEffect, useState } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])
  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav>
        <div className='logo__container'>
          <a href='index.html' className='logo'>Feriados en Chile</a>
        </div>
        <ul className='nav__list-container'>
          <li className='list__link'>
            <a href='#home' className='link'>
              Inicio
            </a>
          </li>
          <li className='list__link'>
            <a href='#showHolidays' className='link'>
              Ver Feriados
            </a>
          </li>
          <li className='list__link'>
            <a href='#searchHolidays' className='link'>
              Buscar Feriado
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

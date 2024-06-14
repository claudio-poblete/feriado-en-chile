import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className='footer__container'>
      <div className='footer__content'>
        <p className='footer__text'>
          Desarrollado por <span className='footer__author'>Claudio Poblete Lagos</span> - 2024
        </p>
        <p className='footer__text'>
          &copy; Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}

export default Footer

import '../styles/hero-section.css'

const HeroSection = () => {
  return (
    <section className='hero__section'>
      <div className='hero__overlay'>
        <div className='hero__title-container'>
          <h2>Feriados</h2>
          <h2>en <span>Chile</span></h2>
        </div>
        <p className='hero__description'>
          Descubre todos los feriados en Chile y planifica tus días libres y vacaciones de manera eficiente.
        </p>
        <div className='hero__button_container'>
          <a className='primary__button' href='#showHolidays'>
            Todos los feriados
          </a>
          <a className='secondary__button' href='buscarFeriado'>
            Buscar Feriados
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

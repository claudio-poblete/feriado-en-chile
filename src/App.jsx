import Buscador from './components/Buscador'
import Footer from './components/Footer'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import MiApi from './components/MiApi'

function App () {
  return (
    <>
      <div id='home' className='header'>
        <Header />
        <HeroSection />
      </div>
      <main>
        <MiApi />
        <Buscador />
      </main>
      <Footer />
    </>
  )
}

export default App

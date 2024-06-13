import Header from './components/Header'
import HeroSection from './components/HeroSection'
import MiApi from './components/MiApi'

function App () {
  return (
    <>
      <div className='header'>
        <Header />
        <HeroSection />
      </div>
      <main>
        <MiApi />
      </main>
    </>
  )
}

export default App

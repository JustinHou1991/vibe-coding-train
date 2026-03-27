import { Navbar, Hero, About, Projects, Contact, Footer } from './components'

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

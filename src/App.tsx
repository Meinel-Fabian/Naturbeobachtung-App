import BeobachtungEintrag from './components/BeobachtungsEintrag'
import './App.css'

function App() {
  

  return (
    <>
      <section id="center">
        <div>
          <h1>Meine Beobachtungen</h1>
          <p><BeobachtungEintrag art='Buntspecht' datum='10.11.2026' notiz='Höhle ca. 4 m hoch, Eiche am Waldrand'/></p>
          <p><BeobachtungEintrag art='Rotkehlchen' datum='10.11.2026' notiz='Im Busch, wahrscheiunlich Revier'/></p>
        </div>
      </section>

    
    </>
  )
}

export default App

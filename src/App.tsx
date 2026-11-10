import BeobachtungsEintrag from './components/BeobachtungsEintrag'
import './App.css'

function App() {
  return (
      <section id="center">
        <div>
          <h1>Meine Beobachtungen</h1>
          <BeobachtungsEintrag art='Buntspecht' datum='10.11.2026' notiz='Höhle ca. 4 m hoch, Eiche am Waldrand'/>
          <BeobachtungsEintrag art='Rotkehlchen' datum='10.11.2026' notiz='Im Busch, wahrscheinlich Revier'/>
        </div>
      </section>
  )
}

export default App

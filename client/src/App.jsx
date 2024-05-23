import { useState } from 'react'
import './App.css'
import WheelComponent from './components/wheel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <header className="App-header">
        <h1>Wheel Decide</h1>
        <WheelComponent />
      </header>
    </div>
  )
}

export default App

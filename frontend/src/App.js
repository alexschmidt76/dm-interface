import './App.css';
import { useState } from 'react'
import Monster from '../../frontend/src/components/monster'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [monsterIndex, setMonsterIndex] = useState('')

  const handleSubmit = () => {
    setMonsterIndex(searchTerm)
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <input type="button" value="Search" onClick={handleSubmit} />
      {
        monsterIndex === ''
        ? null
        : <Monster monsterIndex={monsterIndex} />
      }
    </div>
  )
}

export default App;
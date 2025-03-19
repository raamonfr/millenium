import { useState } from 'react'
import './App.css'

import Header from './components/Header'

import BodyHomeInit from './components/BodyHomeInit'
import BodyHomeMid from './components/BodyHomeMid'
import FooterHome from './components/FooterHome'
import NossoContato from './components/NossoContato'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen bg-zinc-900 flex flex-col justify-between">
      <Header />

      <BodyHomeInit />

      <BodyHomeMid />

      <NossoContato />

      <FooterHome />
    </div>
  )
}

export default App

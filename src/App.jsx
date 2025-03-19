import { useLayoutEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from './components/Header'

import BodyHomeInit from './components/BodyHomeInit'
import BodyHomeMid from './components/BodyHomeMid'
import FooterHome from './components/FooterHome'
import NossoContato from './components/NossoContato'

function App() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to("#nossaMissao", {
      x: 0,
      opacity: 1,
      scrollTrigger:{
        trigger: "#nossaMissao",
        markers: true,
        start: "top 700px",
        end: "bottom 700px",
        scrub: true
      }
    })

    return () => {
      gsap.killTweensOf("#nossaMissao")
    }
  }, [])

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

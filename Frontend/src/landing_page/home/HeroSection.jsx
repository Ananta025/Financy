import React from 'react'

export default function HeroSection() {
  return (
    <div className='container p-5'>
      <div className='row text-center'>
        <img src="/media/images/homeHero.png" alt="homeHero" className='mb-5' style={{width:"95%", margin:"0 auto", display:"block"}}/>
        <h1 className='mt-5'>Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        <button className='p-2 btn btn-primary' style={{width:"15%", margin:"0 auto"}}>Sign up for free</button>
      </div>      
    </div>
  )
}

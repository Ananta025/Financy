import React from 'react'

export default function HeroSection() {
  return (
    <div className='container p-5' id="hero-section">
      <div className='row text-center'>
        <img src="/media/images/homeHero.png" alt="homeHero" className='mb-5 img-fluid' style={{width:"90%", margin:"0 auto", display:"block"}}/>
        <h1 className='mt-5'>Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        <div>
          <button className='p-2 btn btn-primary signup-btn'>Sign up for free</button>
        </div>
      </div>      
    </div>
  )
}

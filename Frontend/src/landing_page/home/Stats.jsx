import React from 'react'

export default function Stats() {
  return (
    <div className='container p-4 p-md-5 mt-4 mt-md-5' id="stats-section">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <h2 className='fs-3'>Trust with confidence</h2>
          <h3 className='fs-4 mt-4'>Customer-first always</h3>
          <p className='text-muted'>That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.</p>

          <h3 className='fs-4 mt-3 mt-md-4'>No spam or gimmicks</h3>
          <p className='text-muted'>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>

          <h3 className='fs-4 mt-3 mt-md-4'>The Zerodha universe</h3>
          <p className='text-muted'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>

          <h3 className='fs-4 mt-3 mt-md-4'>Do better with money</h3>
          <p className='text-muted'>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
        </div>
        <div className="col-lg-6 col-md-12 text-center">
          <img src="\media\images\ecosystem.png" alt="ecosystem" className="img-fluid stats-image" style={{maxWidth:"75%"}}/>
          <div className='stats-links mt-4 d-flex flex-wrap justify-content-center gap-3'>
            <a href="" className="stats-link">Explore our products <i className="fa-solid fa-arrow-right-long ms-1"></i></a>
            <a href="" className="stats-link">Try kite demo <i className="fa-solid fa-arrow-right-long ms-1"></i></a>
          </div>
        </div>
      </div>
      <div className="row mt-4 mt-md-5">
        <div className="col-12 text-center">
          <img src="\media\images\pressLogos.png" alt="presslogos" className="img-fluid press-logos" style={{maxWidth: "80%"}} />
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function Education() {
  return (
    <div className='container p-5' id="education-section">
      <div className='row'>
        <div className="col-lg-6 col-md-12 mb-4 text-center">
          <img src="\media\images\education.svg" alt="" className="img-fluid education-image" />
        </div>
        <div className="col-lg-6 col-md-12 mt-lg-5">
          <h2>Free and open market education</h2>
          <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
          <a href="" className="education-link">Varsity <i className="fa-solid fa-arrow-right-long"></i></a>
          <p className="mt-3">TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
          <a href="" className="education-link">TradingQ&A <i className="fa-solid fa-arrow-right-long"></i> </a>
        </div>
      </div>
    </div>
  )
}

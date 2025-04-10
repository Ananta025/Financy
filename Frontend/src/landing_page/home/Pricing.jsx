import React from 'react'

export default function Pricing() {
  return (
    <div className='container p-5 mt-5' id="home-pricing-section">
      <div className="row">
        <div className="col-lg-5 col-md-12 mb-4">
          <h2>Unbeatable pricing</h2>
          <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
          <a href="" className="pricing-link">See pricing <i className="fa-solid fa-arrow-right-long"></i></a>
        </div>
        <div className="col-lg-7 col-md-12">
          <div className="row">
            <div className="col-md-4 col-sm-12 mb-3 text-center">
              <img src="/media/images/pricing0.svg" alt="" className="img-fluid pricing-icon" />
              <p className='text-muted text-center pricing-text'>Free account <br />
              opening</p>
            </div>
            <div className="col-md-4 col-sm-12 mb-3 text-center">
              <img src="/media/images/pricing0.svg" alt="" className="img-fluid pricing-icon" />
              <p className='text-muted text-center pricing-text'>Free equity delivery
              and direct mutual funds</p>
            </div>
            <div className="col-md-4 col-sm-12 mb-3 text-center">
              <img src="/media/images/intradayTrades.svg" alt="" className="img-fluid pricing-icon" />
              <p className='text-muted text-center pricing-text'> Intraday and
              F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

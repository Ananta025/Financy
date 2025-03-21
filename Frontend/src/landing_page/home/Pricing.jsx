import React from 'react'

export default function Pricing() {
  return (
    <div className='container p-5 mt-5'>
      <div className="row">
        <div className="col-5">
          <h2>Unbeatable pricing</h2>
          <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
          <a href="">See pricing <i className="fa-solid fa-arrow-right-long"></i></a>

        </div>
        <div className="col-7">
          <div className="row">
            <div className="col">
              <img src="/media/images/pricing0.svg" alt="" />
              <p className='text-muted text-center' style={{fontSize:"0.85rem", marginTop:"-3rem"}}>Free account <br />
              opening</p>
            </div>
            <div className="col">
            <img src="/media/images/pricing0.svg" alt="" />
            <p>Free equity delivery
            and direct mutual funds</p>
            </div>
            <div className="col">
              <img src="/media/images/intradayTrades.svg" alt="" />
              <p> Intraday and
              F&O</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

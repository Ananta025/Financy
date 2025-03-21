import React from 'react'

export default function Hero() {
  return (
    <div className='container p-5'>
        <div className="row mb-5 text-center">
            <h2>Charges</h2>
            <h5 className='text-muted'>List of all charges and taxes</h5>
        </div>
        <div className="row mt-5 text-center">
            <div className="col">
                <img src="\media\images\pricing0.svg" alt="" />
                <h2>Free equity delivery</h2>
                <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
            </div>
            <div className="col">
                <img src="\media\images\intradayTrades.svg" alt="" />
                <h2>Intraday and F&O trades</h2>
                <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
            </div>
            <div className="col">
                <img src="\media\images\pricingMF.svg" alt="" />
                <h2>Direct mutual funds</h2>
                <p>All direct mutual fund investments are absolutely free  ₹ 0 commissions & DP charges.</p>
            </div>
        </div>

      
    </div>
  )
}

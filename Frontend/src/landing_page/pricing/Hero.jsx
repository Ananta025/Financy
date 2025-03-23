import React from 'react'

export default function Hero() {
  return (
    <div id='pricing' className='container'>
        <div className="row mb-5 py-3 text-center">
            <h2 className='fs-1'>Charges</h2>
            <h5 className='text-muted'>List of all charges and taxes</h5>
        </div>
        <div className="row mt-5 text-center">
            <div className="col">
                <img src="\media\images\pricing0.svg" alt="" style={{width:"75%"}}/>
                <h2 className='pt-3'>Free equity delivery</h2>
                <p className='text-muted pt-2'>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
            </div>
            <div className="col">
                <img src="\media\images\intradayTrades.svg" alt="" style={{width:"75%"}} />
                <h2 className='pt-3'>Intraday and F&O trades</h2>
                <p className='text-muted pt-2'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
            </div>
            <div className="col">
                <img src="\media\images\pricingMF.svg" alt="" style={{width:"75%"}} />
                <h2 className='pt-3'>Direct mutual funds</h2>
                <p className='text-muted pt-2'>All direct mutual fund investments are absolutely free  ₹ 0 commissions & DP charges.</p>
            </div>
        </div>

      
    </div>
  )
}

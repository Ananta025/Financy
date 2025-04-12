import React from 'react'

export default function Universe() {
  return (
    <div id="universe" className='container px-3 px-md-0 py-4 py-md-0'>
      <div className="row text-center">
        <div className="col-12">
          <h3>The Financy Universe</h3>
          <p className='text-muted mb-4 mb-md-5 px-2 px-md-0'>Extend your trading and investment experience even further with our partner platforms</p>
        </div>
        <div className="col-md-4 col-sm-12 p-3 px-4 px-md-3 mb-4 mb-md-0">
          <img src="\media\images\smallcaseLogo.png" alt="" style={{maxWidth:"50%"}} className="img-fluid" />
          <p className='py-3 text-muted'>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
          <img src="\media\images\streakLogo.png" alt="" style={{maxWidth:"45%"}} className="img-fluid" />
          <p className='text-muted'>Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
        <div className="col-md-4 col-sm-12 p-3 px-4 px-md-3 mb-4 mb-md-0">
          <img src="\media\images\sensibullLogo.svg" alt="" style={{maxWidth:"50%"}} className="img-fluid" />
          <p className='py-3 text-muted'>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
          <img src="\media\images\zerodhaFundhouse.png" alt="" style={{maxWidth:"50%"}} className="img-fluid" />
          <p className='text-muted'>Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
        <div className="col-md-4 col-sm-12 p-3 px-4 px-md-3">
          <img src="\media\images\dittoLogo.png" alt="" style={{maxWidth:"40%"}} className="img-fluid" />
          <p className='py-3 text-muted'>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
          <img src="\media\images\tijori.svg" alt="" style={{maxWidth:"42%"}} className="img-fluid" />
          <p className='text-muted'>Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
      </div>
      <div className='text-center pt-4 pt-md-5'>
        <button className='p-2 btn btn-primary' style={{width: "auto", minWidth: "150px", maxWidth: "250px"}}>Sign up for free</button>
      </div>
    </div>
  )
}

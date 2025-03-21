import React from 'react'

export default function Universe() {
  return (
    <div className='container p-5'>
      <div className="row text-center">
        <h3>The Zerodha Universe</h3>
        <p className='text-muted mb-5'>Extend your trading and investment experience even further with our partner platforms</p>
        <div className="col p-3">
          <img src="\media\images\smallcaseLogo.png" alt="" />
          <p>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
          <img src="\media\images\streakLogo.png" alt="" style={{width:"20%"}}/>
          <p>Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
        <div className="col p-3">
        <img src="\media\images\sensibullLogo.svg" alt="" />
          <p>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
          <img src="\media\images\zerodhaFundhouse.png" alt="" style={{width:"50%"}}/>
          <p>Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
        <div className="col p-3">
        <img src="\media\images\dittoLogo.png" alt="" style={{width:"20%"}}/>
          <p>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
          <img src="\media\images\streakLogo.png" alt="" style={{width:"20%"}}/>
          <p>Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
      </div>
      <div className='text-center'>
      <button className='p-2 btn btn-primary' style={{width:"15%", margin:"0 auto"}}>Sign up for free</button>
      </div>
      
    </div>
  )
}

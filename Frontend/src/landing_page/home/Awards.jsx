import React from 'react'

export default function Awards() {
  return (
    <div className='container p-5 mt-5'>
      <div className="row">
        <div className="col-6 p-5">
          <img src="/media/images/largestBroker.svg" alt="awards" />
        </div>
        <div className="col-6 p-5">
          <h2>Largest stock broker in India</h2>
          <p>2+ million Zerodha client contribute to over 15% of the retail order volumes in India daily by tradinng and investing in:</p>
          <div className="row mt-4">
            <div className="col">
              <ul>
                <li>
                  <p>Future and options </p>
                </li>
                <li>
                  <p>Comodity derivatives</p>
                </li>
                <li>
                  <p>Curency derivatives </p>
                </li>
              </ul>

            </div>
            <div className="col">
            <ul>
                <li>
                  <p>Stocks & IPOs  </p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. assets </p>
                </li>
              </ul>

            </div>
            <img src="\media\images\pressLogos.png" alt="pressLogo" style={{width:"90%"}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

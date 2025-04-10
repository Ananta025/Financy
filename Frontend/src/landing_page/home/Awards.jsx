import React from 'react'

export default function Awards() {
  return (
    <div className='container p-5 mt-5' id="awards-section">
      <div className="row">
        <div className="col-lg-6 col-md-12 p-3 p-lg-5 text-center">
          <img src="/media/images/largestBroker.svg" alt="awards" className="img-fluid awards-image" />
        </div>
        <div className="col-lg-6 col-md-12 p-3 p-lg-5">
          <h2>Largest stock broker in India</h2>
          <p>2+ million Zerodha client contribute to over 15% of the retail order volumes in India daily by tradinng and investing in:</p>
          <div className="row mt-4">
            <div className="col-md-6">
              <ul className="award-list">
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
            <div className="col-md-6">
              <ul className="award-list">
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
            <div className="col-12 text-center mt-4">
              <img src="\media\images\pressLogos.png" alt="pressLogo" className="img-fluid press-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function Hero() {
  return (
    <div id="product-hero" className="container-fluid py-5 px-3 px-md-5 border-bottom mb-5">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="fs-2 mb-2 mb-sm-3">Financy Products</h2>
          <h5 className="text-muted mb-2 mb-sm-3 px-2 px-md-0">Sleek, modern, and intuitive trading platforms</h5>
          <p className="mb-4">Check out our <span id="add-link">investment offerings  <i className="fa-solid fa-arrow-right-long"></i></span></p>
        </div>
      </div>
    </div>
  )
}

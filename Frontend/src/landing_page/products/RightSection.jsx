import React from 'react'

export default function RightSection({imageURL, productName, productDescription, lernMore}) {
  return (
    <div className="container mb-4 mb-md-0 px-3 px-md-0">
        <div id='right-section-content' className="row">
            <div className="col-lg-5 col-md-12 mb-3 mb-lg-0 px-4 px-md-3">
                <h2 className='fs-2'>{productName}</h2>
                <p className='fs-5'>{productDescription}</p>
                <a className="left-section-links" href={lernMore}>Learn more <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="col-lg-7 col-md-12 p-3 p-md-0">
                <img src={imageURL} alt="" className="img-fluid" />
            </div>
        </div>
    </div>
  )
}

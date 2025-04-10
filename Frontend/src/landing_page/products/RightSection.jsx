import React from 'react'

export default function RightSection({imageURL, productName, productDescription, lernMore}) {
  return (
    <div className="container">
        <div id='right-section-content' className="row">
            <div className="col-lg-5 col-md-12 mb-3 mb-lg-0">
                <h2 className='fs-2'>{productName}</h2>
                <p className='fs-5'>{productDescription}</p>
                <a className="left-section-links" href={lernMore}>Learn more <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="col-lg-7 col-md-12">
                <img src={imageURL} alt="" className="img-fluid" />
            </div>
        </div>
    </div>
  )
}

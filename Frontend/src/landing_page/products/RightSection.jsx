import React from 'react'

export default function RightSection({imageURL, productName, productDescription, lernMore}) {
  return (
    <div className="container">
        <div id='right-section-content' className="row">
            <div className="col-5">
                <h2 className='fs-2'>{productName}</h2>
                <p className='fs-5'>{productDescription}</p>
                <a className="left-section-links" href={lernMore}>lern more <i className="fa-solid fa-arrow-right"></i></a>

            </div>
            <div className="col-7">
                <img src={imageURL} alt="" />
            </div>
        </div>
      
    </div>
  )
}

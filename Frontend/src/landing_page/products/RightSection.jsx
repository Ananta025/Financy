import React from 'react'

export default function RightSection({imageURL, productName, productDescription, lernMore}) {
  return (
    <div className="container p-5">
        <div className="row">
            <div className="col-5">
                <h2>{productName}</h2>
                <p>{productDescription}</p>
                <a href={lernMore}>lern more</a>

            </div>
            <div className="col-7">
                <img src={imageURL} alt="" />
            </div>
        </div>
      
    </div>
  )
}

import React from "react";

export default function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  lernMore,
  googlePlay,
  appStore,
}) {
  return (
  <div id="left-section" className="container py-3">
    <div id="left-section-content" className="row">
      <div className="col-7 p-3">
        <img src={imageURL} alt=""/>
      </div>
      <div className="col-5">
        <h2 className="fs-1 mb-3">{productName}</h2>
        <p className="fs-5">{productDescription}</p>
        <div className="d-flex gap-5 fs-6" >
        <a className="left-section-links"  href="{tryDemo}">Try demo <i className="fa-solid fa-arrow-right"></i></a>
        <a className="left-section-links" href="{lernMore}">lern more <i className="fa-solid fa-arrow-right"></i></a>
        </div>
        <div className="d-flex gap-3">
        <a href="{googlePlay}"><img src="\media\images\googlePlayBadge.svg" alt="" /></a>
        <a href="{appStore}"><img src="\media\images\appstoreBadge.svg" alt="" /></a>
        </div>
      </div>
    </div>

  </div>
);
}

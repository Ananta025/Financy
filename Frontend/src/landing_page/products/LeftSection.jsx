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
  <div id="left-section" className="container py-3 py-md-3 px-3 px-md-0 mb-4 mb-md-0">
    <div id="left-section-content" className="row">
      <div className="col-lg-7 col-md-12 p-3">
        <img src={imageURL} alt="" className="img-fluid" />
      </div>
      <div className="col-lg-5 col-md-12 mt-3 mt-lg-0 px-4 px-md-3">
        <h2 className="fs-1 mb-3">{productName}</h2>
        <p className="fs-5">{productDescription}</p>
        <div className="d-flex flex-wrap gap-3 gap-md-5 fs-6 mb-3 mb-sm-4" >
          <a className="left-section-links"  href={tryDemo}>Try demo <i className="fa-solid fa-arrow-right"></i></a>
          <a className="left-section-links" href={lernMore}>Learn more <i className="fa-solid fa-arrow-right"></i></a>
        </div>
        <div className="d-flex flex-wrap gap-3">
          <a href={googlePlay}><img src="\media\images\googlePlayBadge.svg" alt="Google Play" className="img-fluid" style={{maxHeight: "40px"}} /></a>
          <a href={appStore}><img src="\media\images\appstoreBadge.svg" alt="App Store" className="img-fluid" style={{maxHeight: "40px"}} /></a>
        </div>
      </div>
    </div>
  </div>
);
}

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
  <div className="container p-5">
    <div className="row">
      <div className="col-7 p-3">
        <img src={imageURL} alt=""/>
      </div>
      <div className="col-5">
        <h2>{productName}</h2>
        <p>{productDescription}</p>
        <div>
        <a href="{tryDemo}">Try demo</a>
        <a href="{lernMore}">lern more</a>
        </div>
        <div>
        <a href="{googlePlay}"><img src="\media\images\googlePlayBadge.svg" alt="" /></a>
        <a href="{appStore}"><img src="\media\images\appstoreBadge.svg" alt="" /></a>
        </div>
      </div>
    </div>

  </div>
);
}

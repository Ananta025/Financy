import React from "react";

export default function Hero() {
  return (
    <section
      id="support-hero"
      className="container-fluid bg-primary text-white"
    >
      <div id="support-hero-item" className="row">
        <div className="col py-3">
          <h5 className="fs-6">Support portal</h5>
        </div>
        <div className="col-auto">
          <a href="" className="text-white">
            Tracks tickets
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <p className="py-2 fs-5">
            Search for an answer or browse help topics to create a ticket
          </p>
          <input
            className="p-2 w-100 border-0 d-block"
            type="text"
            placeholder="Eg: how do i activate F&O, why is my order getting rejected ..."
            style={{ outline: "none", border: "none", borderRadius: "0.25rem" }}
          />
          <div className="d-flex flex-wrap justify-content-between px-lg-5 px-md-3 px-0">
            <div id="support-links" className="py-3">
              <a href="" className="text-white">
                Track account opening
              </a>
              <a href="" className="text-white">
                Track segment activation
              </a>
            </div>
            <div id="support-links" className="py-3">
              <a href="" className="text-white">
                Intraday margins{" "}
              </a>
              <a href="" className="text-white">
                Kite user manual
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <p className="fs-5 py-2">Featured</p>
          <ol>
            <li>
              <a href="" className="py-2 text-white d-block">
                Rights Entitlements listing in March 2025
              </a>
            </li>
            <li>
              <a href="" className="text-white">
                Latest Intraday leverages and Square-off timings
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

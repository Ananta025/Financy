import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav id="nav-bar" className="navbar navbar-expand-lg bg-white border-bottom p-2.5 position-sticky top-0 ">
      <div className="container">
        <div
        onClick={() => window.location.href = "/"}
        id="nav-logo" className="navbar-brand">
            <img className="img-fluid" style={{width: "32px"}} src="/media/images/Logo copy.svg" alt="Logo" />
            <img className="img-fluid" style={{width: "104px"}} src="/media/images/Logotype.svg" alt="Logotype" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li  className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/signup">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/support">
                Supports
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

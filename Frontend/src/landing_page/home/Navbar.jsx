import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  // Effect to scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  // Function to close the navbar when a menu item is clicked
  const closeNavbar = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    const navbarToggler = document.querySelector(".navbar-toggler");
    
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      // If the navbar is expanded, click the toggler button to close it
      if (navbarToggler) {
        navbarToggler.click();
      }
    }
  };

  return (
    <nav id="nav-bar" className="navbar navbar-expand-lg bg-white border-bottom p-2 p-md-2.5 py-2 py-md-2.75 position-sticky top-0 ">
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
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/signup" onClick={closeNavbar}>
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/about" onClick={closeNavbar}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/products" onClick={closeNavbar}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/pricing" onClick={closeNavbar}>
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link id="nav-item" className="nav-link active" aria-current="page" to="/support" onClick={closeNavbar}>
                Supports
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

import React from 'react'

export default function Footer() {
  return (
    <div id="footer" className='container-fluid'>
      <div className="row">
        <div id='footer-social' className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div
            onClick={()=> window.location.href = "/"}
            id="nav-logo" className="navbar-brand">
              <img className="img-fluid" style={{width: "28px"}} src="/media/images/Logo copy.svg" alt="Logo" />
              <img className="img-fluid" style={{width: "100px"}} src="/media/images/Logotype.svg" alt="Logotype" />
          </div>
          <p className='px-2'>© 2010 - 2025, Financy Broking Ltd. All rights reserved.</p>
          <div id="footer-social-icons" className="pb-3">
            <p><i id="footer-social-icon" className="fa-brands fa-facebook-f"></i></p>
            <p><i id="footer-social-icon" className="fa-brands fa-instagram"></i></p>
            <p><i id="footer-social-icon" className="fa-brands fa-linkedin"></i></p>
            <p><i id="footer-social-icon" className="fa-brands fa-square-x-twitter"></i></p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <p id='footer-link-para' className='text-muted'>Company</p>
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>About</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Products</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Pricing</a>  <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Referral programme</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Careers</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Financy.tech</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Open source</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Press & media</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Financy Cares (CSR)</a> <br />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <p id='footer-link-para' className='text-muted'>Support</p>
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Contact us</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Support portal</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Z-Connect blog</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>List of charges</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Downloads & resources</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Videos</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Market overview</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>How to file a complaint?</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Status of your complaints</a> <br />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <p id='footer-link-para' className='text-muted'>Account</p>
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Open an account</a> <br />
          <a id='footer-link' className='text-muted d-inline-block mb-2' href=''>Fund transfer</a> <br />
        </div>
      </div>
      <div id="footer-paragraph" className='text-muted py-4' style={{fontSize:"0.9rem"}}>
        <p className="mb-3">
        Financy Broking Ltd.: Member of NSE, BSE & MCX  SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd.SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 SEBI Registration no.: INZ000038238 Registered Address: Financy Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
        </p>
        <p className="mb-3">
        Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
        </p>
        <p className="mb-3">
        Smart Online Dispute Resolution | Grievances Redressal Mechanism
        </p>
        <p className="mb-3">
        Investments in securities market are subject to market risks; read all the related documents carefully before investing.
        </p>
        <p className="mb-3">
        Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
        </p>
        <p className="mb-3">"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please create a ticket here.</p>
      </div>
    </div>
  )
}

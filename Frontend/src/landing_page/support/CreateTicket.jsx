import React from 'react'

export default function CreateTicket() {
return (
    <div id="create-ticket" className='container'>
            <div className='row mt-5'>
                    <h5 className='mb-5 text-center text-md-start'>To create a ticket, select a relevant topic</h5>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <h5 className='mb-3'><i className="fa-solid fa-circle-plus me-2"></i> Account Opening</h5>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Resident individual</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Minor</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Non Resident Indian (NRI)</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Company, Partnership, HUF and LLP</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Glossary</a>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <h5 className='mb-3'><i className="fa-solid fa-user me-2"></i> Your Zerodha Account</h5>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Your Profile</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Account modification</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Client Master Report (CMR) and Depository Participant (DP)</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Nomination</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Transfer and conversion of securities</a>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <h5 className='mb-3'><i className="fa-solid fa-chart-line me-2"></i> Kite</h5>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>IPO</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Trading FAQs</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Margin Trading Facility (MTF) and Margins</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Charts and orders</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Alerts and Nudges</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>General</a>
                    </div>
            </div>


            <div className='row mt-5'>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <h5 className='mb-3'><i className="fa-solid fa-wallet me-2"></i> Funds</h5>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Add monney</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Withdraw money</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Add bank accounts</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>eMandates</a>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <h5 className='mb-3'><i className="fa-solid fa-desktop me-2"></i> Console</h5>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Portfolio</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Corporate actions</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Funds statement</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Reports</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Profile</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Segments</a>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                            <h5 className='mb-3'><i className="fa-solid fa-coins me-2"></i> Coin</h5>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Understanding mutual funds and Coin</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Coin app</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Coin web</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>Transactions and reports</a>
                            <a href="" className='text-decoration-none d-block mb-2 ps-3'>National Pension Scheme (NPS)</a>
                    </div>
            </div>
    </div>
)
}

import React from 'react'

export default function Hero() {
    return (
        <section className='container-fluid p-5 bg-primary text-white'>
                <div className="" id="support-hero">
                        <h5>Support portal</h5>
                        <a href="" className='text-white'>Tracks tickets</a>
                </div>
                <div className="row">
                        <div className="col-6">
                                <h5>Search for an answer or browse help topics to create a ticket</h5>
                                <input className='p-2 w-75 border-0 d-block' type="text" placeholder='Eg: how do i activate F&O, why is my order getting rejected ...' style={{outline: 'none', border: 'none', borderRadius:"0.25rem"}}/>
                                <a href='' className='text-white'>Track account opening</a>
                                <a href='' className='text-white'>Track segment activation</a> 
                                <a href='' className='text-white'>Intraday margins </a>
                                <a href='' className='text-white'>Kite user manual</a>
                                
                        </div>
                        <div className="col-6">
                                <h5>Featured</h5>
                                <ol>
                                        <li>
                                        <a href="" className='text-white d-block'>Rights Entitlements listing in March 2025</a>
                                        </li>
                                        <li>
                                        <a href="" className='text-white'>Latest Intraday leverages and Square-off timings</a>
                                        </li>
                                </ol>

                        </div>

                </div>
            
        </section>
    )
}

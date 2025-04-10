import React from 'react'

export default function Hero() {
  return (
    <div id='about-hero' className='container'>
      <div id='about-hero-info' className="row text-center border-bottom ">
        <h2 className='fs-3'>We pioneered the discount broking model in India.</h2>
        <h2 className='fs-3'>Now, we are breaking ground with our technology.</h2>
      </div>
      <div id='about-hero-para' className="row ">
        <div className="col p-5">
          <p>We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>
          <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>
          <p>Over 1+ Crore clients place millions of orders every day through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
        </div>
        <div className="col p-5">
          <p>
          In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
          </p>
          <p>
          <span> Rainmatter</span>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
          </p>
          <p>
          And yet, we are always up to something new every day. Catch up on the latest updates on our <span>blog</span>  or see what the media is <span>saying about us</span> .
          </p>
        </div>
      </div>
      <div className='row mb-5 mt-3'>
        <h2 className='text-center pb-5 mb-5'>Devloped By</h2>
        <div className="col text-center">
          <div className="rounded-circle overflow-hidden mx-auto" style={{width: "18rem", height: "18rem"}}>
            <img src="\media\images\ananta.jpg" alt="ananta" style={{width:"100%", height:"100%", objectFit: "cover"}}/>
          </div>
          <h3 className='mt-3'>Ananta</h3>
          <p>Founder and Developer</p>
        </div>
        <div id="developer-info" className="col ">
          <p>
          Ananta is a passionate full-stack developer with a vision to simplify lives using smart technology. He is the creator of innovative platforms like SMART_FARMING, Commit Control blending clean design with powerful backend systems.
          </p>
          <p>
          Currently pursuing BTech in Computer Science, Ananta has worked on diverse real-world projects in AI, trading, and communication tech. His skillset spans across the MERN stack, WebRTC, Docker, and more. He's also exploring the intersection of AI and web development, bringing intelligence to everyday apps.
          </p>
          <p>
          Ananta is deeply rooted in the Indian developer ecosystem and aims to build scalable, impactful solutions for modern problems. 
          </p>
          <p>
          Connect with Ananta: Homepage / GitHub / Twitter / LinkedIn
          </p>
        </div>
      </div>
    </div>
  )
}

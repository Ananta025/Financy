import React,{useState, useEffect} from 'react'
import OpenAccount from "../OpenAccount"
import axios from 'axios'
import httpStatus from "http-status"



export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_BACKEND_URL);
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signin`,{
        email,
        password
      })
      if(response.status === httpStatus.OK){
        console.log("User logged in successfully");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        window.location.href = import.meta.env.VITE_DASHBOARD_URL;

      }
    }catch(err){
      console.error("Login error:", err.response?.data || err.message);
    }
    setEmail("");
    setPassword("");
  }
  
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_BACKEND_URL);
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signup`,{
        name,
        email,
        password
      })
      if(response.status === httpStatus.CREATED){
        console.log("User created successfully");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        window.location.href = import.meta.env.VITE_DASHBOARD_URL;
      }
    }catch(err){
      console.error("Signup error:", err.response?.data || err.message);
    }
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div id="auth-container" className='container'>
      <div className="row text-center py-3">
        <h2>Open a free demat and trading account online</h2>
        <p className='text-muted'>Start investing brokerage free and join a community of 1.5+ crore investors and traders</p>
      </div>
      <div className="row">
        <div className="col py-5 d-flex justify-content-center">
          <img src="/media/images/signup.png" alt="" />
        </div>


        <div id="auth-form" className="col text-center py-5">
          <div className="auth-form-container">
            <div id="form-tab" className="form-tabs">
              <ul className="nav nav-pills nav-fill" id="authTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button  className="nav-link active w-50" id="login-tab" data-bs-toggle="pill" data-bs-target="#login-panel" type="button" role="tab">Login</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link w-50" id="signup-tab" data-bs-toggle="pill" data-bs-target="#signup-panel" type="button" role="tab">SignUp</button>
                </li>
              </ul>
            </div>
            
            <div className="tab-content" id="authTabContent">
              {/* Login Form */}
              <div className="tab-pane fade show active" id="login-panel" role="tabpanel">
                <form>
                  <div className="mb-4">
                    <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" className="form-control" placeholder="Email Address" required />
                  </div>
                  <div className="mb-4">
                    <input
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    type="password" className="form-control" placeholder="Password" required />
                  </div>
                  <div className="mb-3 text-end">
                    <a href="#" className="text-decoration-none fs-6">Forgot Password?</a>
                  </div>
                  <button
                  onClick={handleLogin}
                  type="submit" className="btn btn-primary w-100">Login</button>
                </form>
              </div>
              
              {/* Signup Form */}
              <div className="tab-pane fade" id="signup-panel" role="tabpanel">
                <form>
                  <div className="mb-4">
                    <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" className="form-control" placeholder="Full Name" required />
                  </div>
                  <div className="mb-4">
                    <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" className="form-control" placeholder="Email Address" required />
                  </div>
                  <div className="mb-4">
                    <input
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    type="password" className="form-control" placeholder="Create Password" required />
                  </div>
                  <div className="mb-3 form-check d-flex justify-content-start gap-3"> 
                    <input type="checkbox" className="form-check-input" id="termsCheck" required />
                    <label className="form-check-label fs-6" htmlFor="termsCheck">I agree to the Terms & Conditions</label>
                  </div>
                  <button
                  onClick={handleSignup}
                  type="submit" className="btn btn-primary w-100">Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-center py-5">
        <h2>Investment options with Financy demat account</h2>
      </div>
      <div id="promotion" className="row py-5 text-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center gap-5 mb-2">
          <img src="\media\images\stocks-acop.svg" alt="" />
          <div className="text-start col-7">
            <h4>Stocks</h4>
            <p className='text-muted'>Invest in the top 500 stocks in India</p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center gap-5 mb-2">
          <img src="\media\images\mf-acop.svg" alt="" />
          <div className="text-start col-7">
            <h4>IPOs</h4>
            <p className='text-muted'>Apply to the latest IPOs instantly via UPI</p>
          </div>
        </div>
      </div>
      <div id="promotion" className="row text-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center gap-5 mb-2">
          <img src="\media\images\ipo-acop.svg" alt="" />
          <div className="text-start col-7">
            <h4>Mutual Funds</h4>
            <p className='text-muted'>Invest in commission-free direct mutual funds</p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center gap-5 mb-2">
          <img src="\media\images\fo-acop.svg" alt="" />
          <div className="text-start col-7">
            <h4>Future & Options</h4>
            <p className='text-muted'>Hedge and mitigate market risk through simplified F&O trading</p>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center my-5 py-2">
        <button className='btn btn-primary w-25'>Explore Investment</button>
      </div>

      <div className="row">
        <div className="row text-center py-5">
          <h2>Steps to open a demat account with Financy</h2>
        </div>
        <div className="row">
          <div className="col py-5 text-center">
            <img src="\media\images\steps-acop.svg" alt="" />
          </div>
          <div className="col py-5 d-flex justify-content-center">
            <ol className='font-bold'>
              <li className="pb-3 mb-3 border-bottom" style={{width: "300px"}}>Enter the requested details</li>
              <li className="pb-3 mb-3 border-bottom" style={{width: "300px"}}>Complete e-sign & verification</li>
              <li>Start investing!</li>
            </ol>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="row text-center py-5">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                How do I open a demat account with Financy?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
              <div className="accordion-body fw-small fs-6">
                Opening a demat account with Financy is simple. Just fill in your details, complete the e-verification process, and you're ready to start investing!
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Is there any charge for opening a demat account?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
              <div className="accordion-body fw-normal fs-6">
                No, opening a demat account with Financy is completely free. We don't charge any account opening or maintenance fees.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                What documents do I need to open a demat account?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
              <div className="accordion-body fw-normal fs-6">
                You'll need your PAN card, Aadhaar card, a recent passport-sized photograph, and a cancelled cheque or bank statement for verification.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                How long does it take to activate my demat account?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
              <div className="accordion-body fw-normal fs-6">
                Once you complete all the verification steps, your demat account is usually activated within 24-48 hours.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              Can I trade in international stocks with Financy?
              </button>
                
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
              <div className="accordion-body fw-normal fs-6">
                Yes, Financy provides access to select international markets, allowing you to invest in global companies directly from your demat account.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                What are the brokerage charges for trading?
              </button>
            </h2>
            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
              <div className="accordion-body fw-normal fs-6">
                Financy offers zero brokerage on equity delivery trades and highly competitive rates for intraday and F&O trading. Check our pricing page for detailed information.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSeven">
              <button className="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                Is my money safe with Financy?
              </button>
            </h2>
            <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#faqAccordion">
              <div className="accordion-body fw-normal fs-6">
                Absolutely! Financy is a SEBI registered broker with robust security measures. Your investments are protected under standard regulatory guidelines and we maintain complete segregation of client funds.
              </div>
            </div>
          </div>
        </div>
      </div>

      <OpenAccount />

    </div>
  )
}

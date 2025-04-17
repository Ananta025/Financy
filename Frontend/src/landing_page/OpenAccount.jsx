import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function OpenAccount() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signup')
  }

  return (
    <div className='container p-5'>
      <div className='row text-center'>
        <h1 className='mt-5'>Open a Financy account</h1>
        <p className='py-3'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
        <button
        onClick={handleClick}
        className='p-2 btn btn-primary mx-auto' style={{width: "auto", minWidth: "200px", maxWidth: "80%"}}>Sign up for free</button>
      </div>      
    </div>
  )
}

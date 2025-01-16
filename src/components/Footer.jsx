import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-blue-700 h-[260px] sm:h-[110px] sm:grid sm:grid-cols-3 ' >
      
      <div className='gap-2 w-full justify-items-center'>
        <div className='justify-items-center sm:bg-white h-full text p-3 hover:text-black text-white sm:text-blue-500 '> 
        <div className='fa-solid fa-plane -rotate-45 text-4xl '></div>
        <h4 className='font-mono font-bold text-2xl  '> Aviaflights</h4>
        {/* <h5 className='font-mono text-xs' >Copyrght</h5> */}
        </div>
        
      </div>

      <div className='flex justify-center gap-4 align-middle mt-8 font-bold text-lg  text-white sm:border-y-0 border-y-2 sm:mt-0 -mt-[0.05px] py-2  ' >
        <Link to='/AboutUs' className='hover:text-black'>About us</Link>
        <h1>-</h1>
        <Link to='/News' className='hover:text-black'>News</Link>
        <h1>-</h1>
        <Link to='/ContactUs' className='hover:text-black'>Contact Us</Link>
      </div>

      <div className='mt-4  text-white ' >
        <h4 className='font-semibold text-center text-base hover:text-black '> Socials: </h4>
        <div className='gap-4 flex justify-center text-4xl'>
        <Link to='#' className='hover:text-black' ><i class="fa-brands fa-facebook "></i></Link>
        <Link to='#' className='hover:text-black'><i class="fa-brands fa-twitter"></i></Link>
        <Link to='#' className='hover:text-black'><i class="fa-brands fa-linkedin"></i></Link>
        <Link to='#' className='hover:text-black'><i class="fa-solid fa-envelope"></i></Link>
        </div>
        
      </div>

    </div>
  )
}

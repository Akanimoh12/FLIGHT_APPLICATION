import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-blue-700 h-[110px] text-white flexn grid grid-cols-3 ' >
      
      <div className='gap-2 w-full justify-items-center'>
        <div className='fa-solid fa-plane -rotate-45 text-4xl '></div>
        <h4 className='font-mono font-bold text-2xl  '> Aviaflights</h4>
        <h5 className='' >Copyrght@2025</h5>
      </div>

      <div className='flex justify-center gap-4 align-middle mt-8 font-bold text-lg ' >
        <Link to='#' className='hover:text-black'>About us</Link>
        <h1>-</h1>
        <Link to='#' className='hover:text-black'>News</Link>
      </div>

      <div className='mt-4' >
        <h4 className='font-semibold text-center text-base hover:text-black '>- Socials: -</h4>
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

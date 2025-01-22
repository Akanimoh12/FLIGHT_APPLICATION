import React from 'react'
import Footer from '../components/Footer'
import GrassFlight from '../assets/grassflight.png'
import LaptopFlight from '../assets/laptopflight.png'

export default function AboutUs() {
  return (
    <div className=' '>

          <div className='sm:w-[80%] w-[90%] m-auto md:grid md:grid-cols-2 h-auto  '>

              <div className=' sm:h-[400px] h-[350px] '>
                <h1 className='font-bold text-3xl hover:text-4xl pb-5 pt-11 border-b-2 '>About Aviaflights:</h1>
                <p className='text-justify text-xl'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Fugiat ipsum vero facere perspiciatis cum itaque doloremque 
                    mollitia quisquam quod quaerat in, nemo dolor laboriosam 
                    consectetur minima qui? Eum est numquam natus eligendi 
                    laudantium vitae! Nulla nemo quasi magnam fugiat odit 
                    fuga impedit quas, provident tempora. Fuga accusantium 
                    doloremque in numquam.</p>

              </div>

              <div className='md:h-[400px] h-[300px] '>
                <img src={LaptopFlight} className='hover:w-[100%] sm:w-[98%] w-[100%]  '/> 
              </div>

          </div>
        <Footer/>
    </div>
  )
}

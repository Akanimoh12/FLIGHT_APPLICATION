import React from 'react'

export default function WhyUs() {
    return (
        <div className='border-t-4 mb-11 '>
            <h1 className='text-center font-bold text-4xl pt-7 font-serif  '>Why choose us!</h1>
            <p className='text-center font-serif italic py-3 text-lg'>AviaFlights brings you the best in booking & reservation</p>

            <div className="w-[95%] py-5 m-auto flex flex-wrap gap-4 h-auto justify-center text-center">

                <div className="rounded-lg p-2 h-auto w-[300px] justify-center ">
                    <i class="fa-classic fa-user"></i>
                    <h1 className='font-bold text-7xl text-gray-700 '>1M+</h1>
                    <h5 className='font-medium text-2xl'>Trusted Users</h5>
                    <p></p>
                </div>

                <div className="rounded-lg p-2 h-auto w-[300px] justify-center">
                    <i class="fa-light fa-user"></i>
                    <h1 className='font-bold text-7xl text-red-500 '>5k+</h1>
                    <h5 className='font-medium text-2xl'>Booked Flights Daily</h5>
                    <p></p>
                </div>

                <div className="rounded-lg p-2 h-auto w-[300px] justify-center">
                    <i class="fa-light fa-user"></i>
                    <h1 className='font-bold text-7xl text-blue-400 '>15M+</h1>
                    <h5 className='font-medium text-2xl'>Monthly Total Visits</h5>
                    <p></p>
                </div>

                <div className="rounded-lg p-2 h-auto w-[300px] justify-center">
                    <i class="fa-light fa-user"></i>
                    <h1 className='font-bold text-7xl text-amber-700 '>4k+</h1>
                    <h5 className='font-medium text-2xl'>Hotels Booked Daily</h5>
                    <p></p>
                </div>
                

            </div>

        </div>
    )
}

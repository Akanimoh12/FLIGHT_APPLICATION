import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Flights from './pages/Flights'
import Hotels from './pages/Hotels'
import ContactUS from './pages/ContactUS'
import News from './pages/News'
import AboutUs  from './pages/AboutUs'
import GrassFlight from './assets/grassflight.png'

function App() {

function changeColor() {
  const change = document.getElementById("flights")
  // change.style.backgroundColor = "white"
}

  return (
  
    <BrowserRouter  >

    <div className=' h-[500px] bg-[url("/src/assets/prof.jpg")]  bg-cover bg-center w-full '>
      <div className='w-full '>
        <h1 className='py-[50px] text-white text-center font-[arial black] font-bold text-5xl '>Search cheap flights and hotels </h1>
      </div>

      <div className='flex gap-4 justify-center bg-blue  mt-[20px] static'>
        <Link to='/' className='bg-black p-[15px] px-7 rounded-s-full text-white font-bold hover:bg-white hover:text-black  ' onClick={changeColor} id='flights' > <div className='fa-solid fa-plane mr-1 '></div>  Flights</Link>
        <Link to='/Hotels' className='bg-black p-[15px] px-7 rounded-e-full text-white font-bold hover:bg-white hover:text-black  ' > <div className='fa-solid fa-hotel mr-1 '></div> Hotels</Link>
      </div>
      
    </div>

    {/* <div className='w-full -mt-52 justify-items-end md:h-0 h[]'>
      <img src={GrassFlight} className='w-72 md:mr-20 hover:rotate-45 hidden md:block' />
    </div> */}
  
    <div>
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/Hotels" element={<Hotels />} />
        <Route path="/ContactUs" element={<ContactUS />} />
        <Route path="/News" element={<News />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

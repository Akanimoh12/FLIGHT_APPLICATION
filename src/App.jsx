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
  
    <BrowserRouter >

    <div className='justify-center flex md:py-[50px] py-[50px] bg-blue-700  font-bold  text-white text-4xl  ' >
      <h1 className='ml-4 m-2 '>Search cheap <span className=' border-amber-500 border-[2px] pb-1 rounded-lg px-4 text-2xl border-dashed' >- Flights -</span> and <span className=' border-amber-500 border-[2px] pb-1 rounded-lg px-4 text-2xl border-dashed  ' >- Hotels -</span> </h1>
    </div>
    
    <nav className='flex gap-4 justify-center bg-blue pb-[60px] bg-blue-700  mt-[-2px] static '>
      <Link to='/' className='bg-blue-900 p-[20px] rounded-lg text-white font-bold hover:bg-amber-500  ' onClick={changeColor} id='flights' > <div className='fa-solid fa-plane mr-1 '></div>  Flights</Link>
      <Link to='/Hotels' className='bg-blue-900 p-[20px] rounded-lg text-white font-bold hover:bg-amber-500 ' > <div className='fa-solid fa-hotel mr-1 '></div> Hotels</Link>
    </nav>

    <div className='w-full -mt-52 justify-items-end md:h-0 h[]'>
      <img src={GrassFlight} className='w-72 md:mr-20 hover:rotate-45 hidden md:block' />
    </div>
  
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

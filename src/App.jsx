import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Flights from './pages/Flights'
import Hotels from './pages/Hotels'

function App() {

function changeColor() {
  const change = document.getElementById("flights")
  // change.style.backgroundColor = "white"
}

  return (
  
    <BrowserRouter >

    <div className='justify-center flex md:py-[70px] py-[50px] bg-blue-700  font-bold  text-white text-4xl  ' >
      <h1 className='ml-4 m-2 '>Search cheap <span className=' border-amber-500 border-[2px] pb-1 rounded-lg px-4 text-2xl border-dashed' >- Flights -</span> and <span className=' border-amber-500 border-[2px] pb-1 rounded-lg px-4 text-2xl border-dashed  ' >- Hotels -</span> </h1>
    </div>
    
    <nav className='flex gap-4 justify-center bg-blue pb-[100px] bg-blue-700 rounded-bl-[700px] rounded-br-[700px] mt-[-2px] static '>
      <Link to='/' className='bg-blue-900 p-[20px] rounded-lg text-white font-bold hover:bg-amber-500  ' onClick={changeColor} id='flights' > <div className='fa-solid fa-plane mr-1 '></div>  Flights</Link>
      <Link to='/Hotels' className='bg-blue-900 p-[20px] rounded-lg text-white font-bold hover:bg-amber-500 ' > <div className='fa-solid fa-hotel mr-1 '></div> Hotels</Link>
    </nav>

    <div>
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/Hotels" element={<Hotels />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

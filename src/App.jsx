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

    <div className='justify-center flex py-[90px] bg-blue-700  font-bold  text-white text-4xl ' >
      <h1>Search cheap <span className=' border-amber-500 border-[1px] pb-1 rounded-lg px-4 text-2xl ' >- Flights -</span> and <span className=' border-amber-500 border-[1px] pb-1 rounded-lg px-4 text-2xl  ' >- Hotels -</span> </h1>
    </div>
    
    <nav className='flex gap-4 justify-center bg-blue pb-[100px] bg-blue-700 rounded-bl-[700px] rounded-br-[700px]  '>
      <Link to='/' className='bg-blue-900 p-[20px] rounded-lg text-white font-bold hover:bg-amber-500  ' onClick={changeColor} id='flights' >  Flights</Link>
      <Link to='/Hotels' className='bg-blue-900 p-[20px] rounded-lg text-white font-bold hover:bg-amber-500 ' >Hotels</Link>
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

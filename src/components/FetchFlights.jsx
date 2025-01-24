import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image1 from '../assets/img01.jpg';
import Image2 from '../assets/img002.jpg';
// import './style.css';


const FetchFlights = () => {
  // State management
  const [flights, setFlights] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedArrival, setSelectedArrival] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showArrivalDropdown, setShowArrivalDropdown] = useState(false);

  // Fetch flights data
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          'https://api.aviationstack.com/v1/flights?access_key=a615a61f42d90a810daa6f97eb79f2a0'
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setFlights(data.data);

// Extract unique locations
const locations = new Set();
        data.data.forEach((flight) => {
        if (flight.departure?.timezone) locations.add(flight.departure.timezone);
        if (flight.arrival?.timezone) locations.add(flight.arrival.timezone);
      });

  setUniqueLocations([...locations]);
}
setLoading(false);
} catch (err) {
  console.error('Error fetching flight data:', err);
  setError('Failed to fetch flight data');
  setLoading(false);
}
}; 
fetchFlights();
}, []);

// Handle form submission
const handleSubmit = () => {
  if (selectedDeparture && selectedArrival) {
    // Filter flights that exactly match departure and arrival locations
    const exactMatches = flights.filter(
      (flight) =>
        flight.departure?.timezone?.toLowerCase().trim() === selectedDeparture.toLowerCase().trim() &&
        flight.arrival?.timezone?.toLowerCase().trim() === selectedArrival.toLowerCase().trim()
    );

    if (exactMatches.length > 0) {
      setFilteredFlights(exactMatches);
    } else {
      // Fallback: Show flights with the selected departure location only
      const fallbackMatches = flights.filter(
        (flight) =>
          flight.departure?.timezone?.toLowerCase().trim() === selectedDeparture.toLowerCase().trim()
      );
      setFilteredFlights(fallbackMatches);
    }

    setFormSubmitted(true);
  } else {
    console.error("Please select both departure and arrival locations.");
  }
};

return (
  <div className='px-[40px] font-[arial black] ' >
    <div className="w-[90%] mx-auto p-6 bg-white shadow-lg mt-[-170px] rounded-md ">
      {/* <div className="flex items-center gap-4 border border-gray-300 w-[180px] h-[50px] rounded-[10px] hover:cursor-pointer hover:text-blue-400">
        <i className="fa fa-fighter-jet" aria-hidden="true"></i>
        <h1 className="text-[17px] w-[140px] py-2 font-bold mb-6 mt-4">Book a flight</h1>
      </div> */}

      {loading && <div>Please hold, Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <div>
          {/* <h2 className="text-xl font-semibold mb-4">Search for Flights</h2> */}
          <div className="space-y-4">
            {/* Departure Dropdown */}
            <div>
              <label className="block text-lg font-medium">From:</label>
              <input
                type="text"
                value={selectedDeparture}
                onClick={() => setShowDepartureDropdown(!showDepartureDropdown)}
                readOnly
                placeholder="Select departure location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showDepartureDropdown && (
                <ul className="mt-2 bg-white shadow-md border border-gray-300 rounded-md max-h-[200px] overflow-y-auto">
                  {uniqueLocations.map((location, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDeparture(location);
                        setShowDepartureDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {location}
                    </button>
                  </li>
))}
                </ul>
              )}
            </div>

            {/* Arrival Dropdown */}
            <div>
              <label className="block text-lg font-medium">To:</label>
              <input
                type="text"
                value={selectedArrival}
                onClick={() => setShowArrivalDropdown(!showArrivalDropdown)}
                readOnly
                placeholder="Select arrival location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {showArrivalDropdown && (
                <ul className="mt-2 bg-white shadow-md border border-gray-300 rounded-md max-h-[200px] overflow-y-auto">
                  {uniqueLocations.map((location, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArrival(location);
                        setShowArrivalDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {location}
                    </button>
                  </li>
))}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-4 w-full py-2 rounded-md font-bold bg-blue-700 hover:bg-black text-white focus:outline-none"
            >
             <i class="fa-solid fa-magnifying-glass mr-1"></i> Search Flights
            </button>
          </div>

          {/* Filtered Flights */}
          {formSubmitted && filteredFlights.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Available Flights</h2>
              <div className="grid grid-cols-1 shadow-black shadow-md md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                {filteredFlights.map((flight, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-md hover:bg-blue-50"
                >
                  <p className='w-full bg-gray-600 h-20 text-center justify-items-center rounded-md '>
              
                      <p className='text-white font-bold'>{flight.departure?.timezone} </p>
                    
                  </p>
                  <h3 className="text-lg font-bold">
                    {flight.departure?.timezone} to {flight.arrival?.timezone}
                  </h3>
                  <p className='p-1'>Flight Number: {flight.flight?.number}</p>
                  <p className='p-1'>Date: {flight.flight_date}</p>
                  <p className='p-1'>Departure Airport: {flight.departure?.airport}</p>
                  <p className='p-1'>Arrival Airport: {flight.arrival?.airport}</p>
                  <button className="bg-gray-600 w-full p-2 mt-2 font-semibold rounded-md text-white hover:bg-black">
                        Book Now
                      </button>
                </div>
))}
              </div>
              {filteredFlights.some(
                (flight) =>
                  flight.arrival?.timezone?.toLowerCase() !== selectedArrival.toLowerCase().trim()
              ) && (
                  <p className="text-sm text-gray-500 mt-4">
                    Showing flights departing from {selectedDeparture}. No exact matches found for the selected arrival location.
                  </p>
                )}
            </div>
          )}

          {formSubmitted && filteredFlights.length === 0 && (
            <div className="mt-6 text-red-500">
              No flights found for the selected locations.
            </div>
          )}
        </div>
      )}
    </div>

      <div className="w-[90%] py-12 m-auto flex flex-wrap gap-4 h-auto justify-center">
                    <div className="rounded-lg p-2 border-2 h-auto bg-white">
                      <img src={Image1} className="h-[200px] w-[300px]" />
                      <h1 className="text-3xl font-bold py-2">New York Airline</h1>
                      <button className="bg-black w-full p-2 font-semibold rounded-md text-white hover:bg-blue-700">
                        Book Now
                      </button>
                    </div>
                    <div className="rounded-lg p-2 border-2 h-auto bg-white">
                      <img src={Image2} className="h-[200px] w-[300px]" />
                      <h1 className="text-3xl font-bold py-2">America Airline</h1>
                      <button className="bg-black w-full p-2 font-semibold rounded-md text-white hover:bg-blue-700">
                        Book Now
                      </button>
                    </div>
                    <div className="rounded-lg p-2 border-2 h-auto bg-white">
                      <img src={Image1} className="h-[200px] w-[300px]" />
                      <h1 className="text-3xl font-bold py-2">Belgium Airline</h1>
                      <button className="bg-black w-full p-2 font-semibold rounded-md text-white hover:bg-blue-700">
                        Book Now
                      </button>
                    </div>
                  </div>
      
  
  </div>
);
};

export default FetchFlights;

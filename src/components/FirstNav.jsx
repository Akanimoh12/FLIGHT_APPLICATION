import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image1 from '../assets/img01.jpg';
import Image2 from '../assets/img002.jpg';
import './style.css';

const FetchFlights = () => {
  // States for user input and fetched flight data
  const [departureTimezone, setDepartureTimezone] = useState('');
  const [arrivalTimezone, setArrivalTimezone] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchingDepartureTimezones, setMatchingDepartureTimezones] = useState([]);
  const [matchingArrivalTimezones, setMatchingArrivalTimezones] = useState([]);

  // Function to fetch flight data from the AviationStack API
  const fetchFlights = async () => {
    if (!departureTimezone || !arrivalTimezone) return;

    setLoading(true);

    const url = `https://api.aviationstack.com/v1/flights?access_key=1b7b57472856170c673b55aca8f63a21&departure_timezone=${departureTimezone}&arrival_timezone=${arrivalTimezone}`;

    try {
      const response = await axios.get(url);
      setFlights(response.data.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch available timezones based on the input keyword (for both departure and arrival)
  const fetchMatchingTimezones = async (input, isDeparture) => {
    if (!input) return;

    const url = `https://api.aviationstack.com/v1/airports?access_key=1b7b57472856170c673b55aca8f63a21`;

    try {
      const response = await axios.get(url);
      const allTimezones = response.data.data.map((airport) => airport.timezone);
      const matchingTimezones = allTimezones.filter((timezone) =>
        timezone.toLowerCase().includes(input.toLowerCase())
      );
      if (isDeparture) {
        setMatchingDepartureTimezones(matchingTimezones.slice(0, 10)); // Limit to 10 results
      } else {
        setMatchingArrivalTimezones(matchingTimezones.slice(0, 10)); // Limit to 10 results
      }
    } catch (error) {
      console.error('Error fetching timezones:', error);
    }
  };

  // Effect to fetch flights whenever user inputs change
  useEffect(() => {
    fetchFlights();
  }, [departureTimezone, arrivalTimezone]);

  // Debounced function to fetch matching timezones (avoiding too many API calls)
  const debounceFetchTimezones = useCallback(
    (input, isDeparture) => {
      const timeout = setTimeout(() => fetchMatchingTimezones(input, isDeparture), 500);
      return () => clearTimeout(timeout);
    },
    []
  );

  // Handle changes for the departure and arrival timezone inputs
  const handleDepartureTimezoneChange = (e) => {
    const value = e.target.value;
    setDepartureTimezone(value);
    debounceFetchTimezones(value, true); // Fetch matching departure timezones
  };

  const handleArrivalTimezoneChange = (e) => {
    const value = e.target.value;
    setArrivalTimezone(value);
    debounceFetchTimezones(value, false); // Fetch matching arrival timezones
  };

  // Handle click on timezone option to fill the input field
  const handleTimezoneClick = (timezone, isDeparture) => {
    if (isDeparture) {
      setDepartureTimezone(timezone);
      setMatchingDepartureTimezones([]); // Clear the matching options
    } else {
      setArrivalTimezone(timezone);
      setMatchingArrivalTimezones([]); // Clear the matching options
    }
  };

  return (
    <div className="pb-5 py-5">
      <div className="md:w-3/5 m-auto p-7 md:flex gap-1 ">
        <label className="bg-amber-500 md:w-1/2 w-full p-2 h-12 rounded-tl-2xl md:rounded-bl-2xl flex font-bold">
          From:
          <input
            type="text"
            value={departureTimezone}
            onChange={handleDepartureTimezoneChange}
            placeholder=" America/New_York "
            className="w-[90%] pl-1 ml-1"
          />
          {matchingDepartureTimezones.length > 0 && (
            <div className="timezone-popup">
              {matchingDepartureTimezones.map((tz, index) => (
                <div
                  key={index}
                  className="timezone-item"
                  onClick={() => handleTimezoneClick(tz, true)}
                >
                  {tz}
                </div>
              ))}
            </div>
          )}
        </label>

        <label className="bg-amber-500 md:w-1/2 w-full p-2 h-12 md:rounded-tr-2xl rounded-br-2xl flex font-bold justify-between">
          To:
          <input
            type="text"
            value={arrivalTimezone}
            onChange={handleArrivalTimezoneChange}
            placeholder=" Europe/London "
            className="w-[90%] pl-1 ml-1"
          />
          {matchingArrivalTimezones.length > 0 && (
            <div className="timezone-popup">
              {matchingArrivalTimezones.map((tz, index) => (
                <div
                  key={index}
                  className="timezone-item"
                  onClick={() => handleTimezoneClick(tz, false)}
                >
                  {tz}
                </div>
              ))}
            </div>
          )}
        </label>
      </div>

      {loading ? (
        <p className="justify-center text-center py-16 text-xl">Loading flights...</p>
      ) : (
        <div className="flight-results">
          {flights.length > 0 ? (
            <div className="w-4/5 m-auto flex flex-wrap gap-2 h-auto justify-center">
              {flights.map((flight, index) => (
                <div key={index} className="rounded-lg p-2 border-2 h-auto w-56">
                  <h3>{flight.airline.name} - {flight.flight.iata}</h3>
                  <p>Departure: {flight.departure.airport} at {flight.departure.estimated}</p>
                  <p>Arrival: {flight.arrival.airport} at {flight.arrival.estimated}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-4/5 m-auto flex flex-wrap gap-2 h-auto justify-center">
              <div className="rounded-lg p-2 border-2 h-auto">
                <img src={Image1} className="h-[200px] w-[300px]" />
                <h1 className="text-3xl font-bold py-2">New York Airline</h1>
                <button className="bg-blue-500 p-2 font-semibold rounded-md text-white hover:bg-amber-500">
                  Book Now
                </button>
              </div>
              <div className="rounded-lg p-2 border-2 h-auto">
                <img src={Image2} className="h-[200px] w-[300px]" />
                <h1 className="text-3xl font-bold py-2">America Airline</h1>
                <button className="bg-amber-500 p-2 font-semibold rounded-md text-white hover:bg-blue-500">
                  Book Now
                </button>
              </div>
              <div className="rounded-lg p-2 border-2 h-auto">
                <img src={Image1} className="h-[200px] w-[300px]" />
                <h1 className="text-3xl font-bold py-2">Belgium Airline</h1>
                <button className="bg-blue-500 p-2 font-semibold rounded-md text-white hover:bg-amber-500">
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchFlights;

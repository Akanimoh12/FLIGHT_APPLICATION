import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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

    const url = `https://api.aviationstack.com/v1/flights?access_key=b4d4c355082ca18b47f4cd2ce0b0e8eb&departure_timezone=${departureTimezone}&arrival_timezone=${arrivalTimezone}`;

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

    const url = `https://api.aviationstack.com/v1/airports?access_key=b4d4c355082ca18b47f4cd2ce0b0e8eb`;

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
    <div className="App">

      <div className="form-container">
        <label>
          From:
          <input
            type="text"
            value={departureTimezone}
            onChange={handleDepartureTimezoneChange}
            placeholder=" America/New_York "
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
        <label>
          To:
          <input
            type="text"
            value={arrivalTimezone}
            onChange={handleArrivalTimezoneChange}
            placeholder=" Europe/London "
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
        <p>Loading flights...</p>
      ) : (
        <div className="flight-results">
          {flights.length > 0 ? (
            <ul>
              {flights.map((flight, index) => (
                <li key={index}>
                  <h3>{flight.airline.name} - {flight.flight.iata}</h3>
                  <p>Departure: {flight.departure.airport} at {flight.departure.estimated}</p>
                  <p>Arrival: {flight.arrival.airport} at {flight.arrival.estimated}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No flights available for the given search criteria.</p>
          )}
        </div> 
      )}
    </div>
  );
};

export default FetchFlights;

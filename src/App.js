import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
require("dotenv").config({path: "../.env"});

function App() {
  const [search, setSearch] = useState("")
  const [allData, setAllData] = useState({
    city: 'atlanta',
    country: 'US',
    temperature: '75',
    humidity: '40',
    minTemperature: '70',
    weatherIcons: '10d'
  })

  useEffect(() => {
    fetchData(allData.city)
  }, [])

  const fetchData = async (city) => {
    // try catch error handling
    try {
      const APIKEY = process.env.APIKEY
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        minTemperature: result.data.main.temp_min,
        weatherIcons: result.data.weather[0].icon
      })
    } catch(error) {
      console.log('API not loaded correctly or loaded for the first time')
    }
    
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData(search)
  }

  return (
    <main>
      <div className="App">
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" 
            className='input'
            name="city"
            placeholder='City Name'
            value={search}
            onChange={handleChange}
          />
          <button className='button' for='city'>Search</button>
        </form>
        <section>
          <div className='header-div'>
            <div>
              <div className='data'>
                <img src={`http://openweathermap.org/img/wn/${allData.weatherIcons}@2x.png`} alt="" />
                <h1 className='title'>{allData.city}</h1>
                <h2 className='location'>{allData.country}</h2>
                <div className='weather-description'>
                  <div>
                    <h3>HUMIDITY</h3>
                    <p>{allData.humidity} %</p>
                  </div>
                  <div>
                    <h3>TEMPERATURE</h3>
                    <p>{allData.temperature} F</p>
                  </div>
                  <div>
                    <h3>MIN TEMPERATURE</h3>
                    <p>{allData.minTemperature} F</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;

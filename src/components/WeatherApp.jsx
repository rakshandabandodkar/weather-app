import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import loadingGif from '../assets/images/loading.gif'

import { useEffect, useState } from 'react'

const weatherapp = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('') 
  const [loading, setLoading] = useState(false)
  const api_key = 'a22ac5d589d6f6b7348b67ca80f6a5e6'
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true)
      const defaultLocation = "goa"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`
      const res = await fetch(url)
      const defaultData = await res.json()
      setData(defaultData)
      setLoading(false)
    }
    fetchDefaultWeather()
  }, [])
  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }
  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
      const res = await fetch(url)
      const searchData = await res.json()
      if (searchData.cod !== 200) {
        setData({ notfound: true })
      } else {
        console.log(searchData)
        setData(searchData)
        setLocation('')
      }
      setLoading(false)
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }
  const weatherImages = {
    clear: sunny,
    clouds: cloudy,
    rain: rainy,
    snow: snowy,
    haze: cloudy,
    mist: cloudy,
    drizzle:rainy,
  }
  const weatherImage = data.weather ? weatherImages[data.weather[0].main.toLowerCase()] : null
  const backgroundimages = {
    Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
    Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: 'linear-gradient(to right, #a4f7ff, #fff)',
    Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
    drizzle: 'linear-gradient(to right, #5bc8fb, #80eaff)',

  }
  const backgroundImage = data.weather ? backgroundimages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)'
  const currentDate = new Date()

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dayOfWeek = daysOfWeek[currentDate.getDay()]
  const month = months[currentDate.getMonth()]
  const dayOfMonth = currentDate.getDate()
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`
  return (
    <div className="container" style={{ backgroundImage }}>
      <div className="weather-app" style={{
        backgroundImage:
          backgroundImage && backgroundImage.replace
            ? backgroundImage.replace('to right', 'to top')
            : null
      }}
      >
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        {
          loading ? (<img className='loader' src={loadingGif} alt='loading'/>) : data.notfound ? (<div className='not-found'>Not Found 😒 </div>) : (
            <>
              <div className="weather">
                <div className="weather-img">
                  <img src={weatherImage} alt="sunny" />
                </div>
                <div className="weather-body">
                  <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                  <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°C` : null}</div>
                  <div className="weather-date">
                    <p>{formattedDate}</p>
                  </div>
                  <div className="weather-data">
                    <div className="humidity">
                      <div className="data-name">humidity</div>
                      <i className="fa-solid fa-droplet"></i>
                      <div className="data">{data.main ? data.main.humidity : null}%</div>
                    </div>
                    <div className="wind">
                      <div className="data-name">wind</div>
                      <i className="fa-solid fa-wind"></i>
                      <div className="data">{data.wind ? data.wind.speed : null}Km/Hr</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default weatherapp
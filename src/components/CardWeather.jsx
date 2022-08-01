import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({ lat, lon }) => {

    const [weather, setWeather] = useState()
    const [temperture, setTemperture] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if (lon && lat) {
            const APIkey = '31ed6f8de99889a7e0d90d29c66fcb09'

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

            axios.get(url)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celcius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                        farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
                    }
                    setTemperture(temp)
                    setIsLoading(false)
                })

                .catch(err => console.log(err))
        }

    }, [lat, lon])

    console.log(weather)

    const handleClick = () => setIsCelsius(!isCelsius)

    if (isLoading) {
        return <LoadingScreen />
    } else {
        return (
            <article className='card'>
                <h1>Weather App</h1>
                <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
                <div className='card__weather'>
                    <div className='card__weather2'>
                        <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                        <h2>{isCelsius ? temperture?.celcius : temperture?.farenheit}</h2>
                    </div>
                    <div className='card__weather3'>
                        <h3>&#34;{weather?.weather[0].description}&#34;</h3>
                        <ul>
                            <h4><i className='bx bx-wind'></i><strong> Wind speed: </strong>{weather?.wind.speed} m/s</h4>
                            <h4><i className='bx bxs-cloud'></i><strong> Clouds: </strong>{weather?.clouds.all} %</h4>
                            <h4><i className='bx bxs-eyedropper'></i><strong> Humidity: </strong>{weather?.main.humidity} %</h4>
                            <h4><i className='bx bxs-droplet'></i><strong> Pressure: </strong>{weather?.main.pressure} mb</h4>
                        </ul>
                    </div>
                </div>
                <button onClick={handleClick}>{isCelsius ? "Degress to °F" : "Degress to °C"} </button>
            </article>
        )

    }


}

export default CardWeather
import React, { useState } from "react";
//usestate kullanilacak
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from 'axios';

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  //weatherData yeni bir veri ile set edilecek demek
  const [city, setCity] = useState(props.defaultCity);
//Default city yani London setCity ile degistirilebilir


  function handleResponse(response) {
    setWeatherData({
        //weatherDatanin yeni verileri
        //Response ile tum verileri aldim 
      ready: true,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
      city: response.data.name,
    });
  }

  // function search() {
  //     //Web servise erişim sağlamak için vermiş olduğu özel kod o kod olmaZsa servis yanıt vermez
  //   const apiKey = "80ff9ab07927e65d043ab3591c9e3c20";
  //   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //   axios.get(apiUrl).then(handleResponse);
  // }

  const search = async () => {
    const apiKey = "80ff9ab07927e65d043ab3591c9e3c20";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response =  await axios.get(apiUrl)
    handleResponse(response)
  }


   function handleSubmit(event) {
    event.preventDefault();
    //sayfayi yeniletmeden calistir demek
    //formu submit etmek
    search();
    //search fonksiyonu cagirilmis
  }

  function handleCityChange(event) {
    setCity(event.target.value);
    //Girilen sehrin degerini alip yeni city set ediyor ve handlecitychange e gonderiyor
  }

  if (weatherData.ready) {
    return (
      <div className="box">
        <div className="container">
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-9">
                <input
                  type="search"
                  placeholder="Enter a town or city"
                  className="form-control"
                  autocomplete="off"
                  onChange={handleCityChange}
                />
              </div>
              <div classname="col-2">
                <input
                  type="submit"
                  value="Enter" 
                  className="form-control btn btn-outline-black shadow-sm "
                />
              </div>
            </div>
          </form>
          <WeatherInfo data={weatherData} />
          <WeatherForecast city={weatherData.city} />
        </div>
      </div>
    );
  } else {
    search();
    return "Loading..";
  }
}
import React, { useState, useEffect } from "react";
import "./css/style.css";

const TempApp = () => {
  const [search, setSearch] = useState("kolkata");

  const [error_, setError] = useState();
  const [cityName, setCityName] = useState();
  const [minTemp, setMinTemp] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [temp, setTemp] = useState();

  const onChangeHandler = (eve) => {
    setSearch(eve.target.value);
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=101599b709375b2e22901d4a8d53a5c9`;
        const response = await fetch(url);
        const resJson = await response.json();
        console.log(resJson.main.temp_min);

        setCityName(resJson.name);
        setMinTemp(resJson.main.temp_min);
        setMaxTemp(resJson.main.temp_max);
        setTemp(resJson.main.temp);
        setError(false);
        console.log(resJson.cod, "err");
      } catch (error) {
        setError(true);
        console.log("city not found: 404");
      }
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="text"
            className="inputField"
            onChange={onChangeHandler}
          />
        </div>

        {error_ ? (
          <p className="errorMsg">No data found</p>
        ) : (
          <div className="info">
            <h2 className="location">{cityName}</h2>
            <i className="fa-solid fa-street-view"></i>
            <h1 className="temp">{temp}°c</h1>
            <h3 className="tempmin_max">
              min:{minTemp} max:{maxTemp}°c
            </h3>
          </div>
        )}

        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>{" "}
    </>
  );
};

export default TempApp;

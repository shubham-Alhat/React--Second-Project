import { useCallback, useEffect, useState } from "react";
import { countryCodes } from "./countryCode";

function App() {
  // useState() for option list
  const [fromCountryCode, setFromCountryCode] = useState("USD");
  const [toCountryCode, setToCountryCode] = useState("INR");
  // useState() for currency value
  const [fromCurrencyValue, setFromCurrencyValue] = useState(1);
  const [toCurrencyValue, setToCurrencyValue] = useState(0);

  // function to change Currency Value at every change in input field
  function updateFromCurrencyValue(event) {
    setFromCurrencyValue(event.target.value);
  }

  // function to set selected option
  function handleFromCountryCode(event) {
    setFromCountryCode(event.target.value);
  }

  // function to set selected option
  function handleToCountryCode(event) {
    setToCountryCode(event.target.value);
  }

  // function to fetch data
  const fetchData = useCallback(
    async (fromCountryCode, toCountryCode, fromCurrencyValue) => {
      try {
        // fetch process starts
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/584ec7a30456638db9cd8ab1/latest/${fromCountryCode}`
        );
        const data = await response.json();
        const dataAmount = data.conversion_rates[toCountryCode];
        const resultAmount = Number(fromCurrencyValue) * dataAmount;
        setToCurrencyValue(resultAmount);
      } catch (error) {
        console.log("error:", error);
      }
    },
    [fromCountryCode, toCountryCode, fromCurrencyValue]
  );

  // call fetchData function
  useEffect(() => {
    fetchData(fromCountryCode, toCountryCode, fromCurrencyValue);
  }, [fromCountryCode, toCountryCode, fromCurrencyValue]);

  return (
    <>
      <div className="h-screen w-full bg-black flex flex-col justify-center items-center gap-5">
        {/* heading */}
        <h1 className="text-3xl text-white font-thin">Currency Converter</h1>

        {/* Main Box */}
        <div className="min-w-64 md:min-w-80 border-2 rounded-lg p-5 flex flex-col items-center gap-3">
          {/* From-Conversion Box */}
          <div className="w-full flex justify-between bg-white gap-3 px-4 py-3 border-2 rounded-lg text-gray-700 font-light">
            {/* from Input Box */}
            <div id="inputBox" className="h-full flex flex-col gap-3">
              <label htmlFor="fromCurr">From</label>
              <input
                value={fromCurrencyValue}
                id="fromCurr"
                min={0}
                type="number"
                className="outline-none "
                onChange={updateFromCurrencyValue}
              />
            </div>
            {/* options list Box */}
            <div id="OptionBox" className="h-full flex flex-col gap-3">
              <label htmlFor="Optionlist-1">Currency Type</label>
              <select
                id="Optionlist-1"
                value={fromCountryCode}
                onChange={handleFromCountryCode}
                className="border-2 outline-none text-center"
              >
                {countryCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap button */}
          <button className="px-5 py-2  text-xl font-normal bg-blue-600  duration-300 rounded-md hover:bg-blue-700 text-white">
            Swap
          </button>

          {/* To-conversion Box */}
          <div className="w-full flex justify-between bg-white gap-3 px-4 py-3 border-2 rounded-lg text-gray-700 font-light">
            {/* To Input Box */}
            <div id="inputBox" className="h-full flex flex-col gap-3">
              <label htmlFor="ToCurr">To</label>
              <input
                readOnly
                value={toCurrencyValue}
                id="ToCurr"
                min={0}
                type="number"
                className="outline-none "
              />
            </div>
            {/* options list Box */}
            <div id="OptionBox" className="h-full flex flex-col gap-3">
              <label htmlFor="Optionlist-2">Currency Type</label>
              <select
                id="Optionlist-2"
                value={toCountryCode}
                onChange={handleToCountryCode}
                className="border-2 outline-none text-center"
              >
                {countryCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conversion Button */}
          <button className="w-full py-3  text-xl font-normal bg-blue-600  duration-300 rounded-md hover:bg-blue-700 text-white">
            Convert {fromCountryCode} to {toCountryCode}
          </button>

          {/*  */}
        </div>
      </div>
    </>
  );
}

export default App;

import React, {useState} from 'react';

import Data from './components/data';
import CountryPicker from './components/picker';
import Charts from './components/chart';

function App() {
  const [country,setCountry]= useState();
  const [countryData,setCountryData]=useState();
  return<div class='container'>
     <h1>COVID-19</h1>
     <Data country={country} setCountryData={setCountryData}/>
     <CountryPicker setCountry={setCountry}/>
     <Charts country={country} countryData={countryData}/>
    </div>

}

export default App;

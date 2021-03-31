import React ,{useEffect, useState} from 'react';
import './data.css';
import { format } from "date-fns";



let link = 'https://covid19.mathdro.id/api';



function Data(props){
// console.log(props)
    const [apiData,setApiData]=useState();
    let [loading ,setLoading] = useState(false);
    useEffect(()=>{
        async function allData(){
            setLoading(true);
            if(props.country){
              link = `https://covid19.mathdro.id/api/countries/${props.country}`
                
            }
            const resp= await fetch(link);
            
            const abc= await resp.json();
            // console.log(abc);
            // console.log(abc.confirmed.value);
            setApiData(abc); 
            setLoading(false); 

        }
        allData();
    },[props.country]);

   
   
    
       const load='Loading';
      if(loading){
        return<div>
            <div class='grid'>
            <div class='icon'>
                <div class='title' style={{color:'rgba(0, 0, 255, 0.5)'}}>Infected</div>
                <div class='count'>{load}</div>
                <div class='date'>Date</div>
                <div class='statement'>No. of active cases of COVID-19</div>
            </div>
            <div class='icon'>
                <div class='title' style={{color:'rgba(12, 94, 12, 0.5)'}}>Recovered</div>
                <div class='count'>{load}</div>
                <div class='date'>Date</div>
                <div class='statement'>No. of recoveries from COVID-19</div>
            </div>
            <div class='icon'>
                <div class='title' style={{color:'rgba(255, 0, 0, 0.5)'}}>Deaths</div>
                <div class='count'>{load}</div>
                <div class='date'>Date</div>
                <div class='statement'>No. of deaths caused by COVID-19</div>
            </div>

        </div></div>
      }
      {
          props.setCountryData(apiData)
      }
     
    return<div>
        
        <div class='grid'>
        <div class='icon'>
            <div class='title' style={{color:'rgba(0, 0, 255, 0.5)'}}>Infected</div>
            <div class='count'>{apiData && apiData.confirmed && apiData.confirmed.value}</div>
            <div class='date'>{new Date(apiData && apiData.lastUpdate).toDateString()}</div>
            <div class='statement'>No. of active cases of COVID-19</div>
        </div>
        <div class='icon'>
            <div class='title' style={{color:'rgba(12, 94, 12, 0.5)'}} >Recovered</div>
            <div class='count'>{apiData && apiData.recovered && apiData.recovered.value}</div>
            <div class='date'>{new Date(apiData && apiData.lastUpdate).toDateString()}</div>
            <div class='statement'>No. of recoveries from COVID-19</div>
        </div>
        <div class='icon'>
            <div class='title' style={{color:'rgba(255, 0, 0, 0.5)'}} >Deaths</div>
            <div class='count'>{apiData && apiData.deaths && apiData.deaths.value}</div>
            <div class='date'>{new Date(apiData && apiData.lastUpdate).toDateString()}</div>
            <div class='statement'>No. of deaths caused by COVID-19</div>
        </div>

    </div></div>
    
}
export default Data;
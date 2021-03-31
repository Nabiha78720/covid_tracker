
import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControl,NativeSelect} from '@material-ui/core';

const link = 'https://covid19.mathdro.id/api/countries';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CountryPicker(props) {
  const classes = useStyles();
  const [apiCountry,setApiCountry]=useState([]);
  // console.log(props);

  useEffect(()=>{
      async function allCountries(){
           
          const resp= await fetch(link);
          const country= await resp.json();
          // console.log(country);
          
          setApiCountry(country.countries.map((item)=>item.name)); 

      }
        
      allCountries();
     
  },[]);

  // console.log(apiCountry);  
  return (
    <div>
      <FormControl className={classes.formControl}>
        <NativeSelect  onChange={(evt) => {
          props.setCountry(evt.target.value);
          }}>
            <option>Select Country</option>
          
          {
            //  console.log(apiCountry)
            apiCountry.map((country)=>{
              return<option>{country}</option>
            })
          }
        </NativeSelect>
      </FormControl>
      </div>
  )
};
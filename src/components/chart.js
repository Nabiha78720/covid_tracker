import React, { useEffect, useState } from 'react';
import {Line,Bar} from 'react-chartjs-2';
import './chart.css';

export default function Charts(props){
    // console.log(props);
    let link = 'https://covid19.mathdro.id/api/daily';

    const [chartData,setChartData]=useState([]);
    
    useEffect(()=>{
        async function chart(){
            const resp=await fetch(link);
            const fetchData= await resp.json();
            // console.log(fetchData)
            const changedData = fetchData.map((data)=>({
                confirmed:data.confirmed.total,
                deaths:data.deaths.total,
                date:data.reportDate

            }))
            setChartData(changedData);
        }
        chart();
    },[])
    // console.log(chartData)

    const lineChart=(
        chartData.length?
        (<Line
            data={{
                labels: chartData.map(({date})=>date),
                datasets: [{
                    data:chartData.map(({confirmed})=>confirmed),
                    label:'Confirmed',
                    borderColor: 'blue',
                    fill: true,
                    backgroundColor:'#EFB1A4 '
                },{
                    data:chartData.map(({deaths})=>deaths),
                    label:'Deaths',
                    borderColor: 'red',
                    fill: true,
                    backgroundColor:'#EFB1A4 '
                }]
            }}
        />):null
    );

    const barChart=(
       props.countryData?
        (<Bar
        data={{
            labels:['infected','recovered','deaths'],
            datasets:[{
                label:'People',
                backgroundColor:[
                   ' rgba(0, 0, 255, 0.5)',
                   'rgba(12, 94, 12, 0.5)',
                   'rgba(255, 0, 0, 0.5)'
                ],
                data:[props.countryData.confirmed.value,props.countryData.recovered.value,props.countryData.deaths.value]
            }]
        }}
        options={{
            legend:{display:false},
            title:{display:true,text:props.country},
        }}
        />):null
    )
    return<div  className='line'>
        { props.country? barChart:lineChart}
    </div>
}
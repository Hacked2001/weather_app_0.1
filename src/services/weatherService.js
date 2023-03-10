


//Importing the dependencies;
//import {formatForcastWeather,formattedForecastWeather} from "luxon";
import { DateTime } from "luxon";


const API_KEY='5a3c5e459cfa604fbe89ae72f23d99a6';
const BASE_URL='https://pro.openweathermap.org/data/2.5';

const getWeatherData=(infoType,searchParams)=>{
                  const url=new URL(BASE_URL +'/'+ infoType);
                  url.search=new URLSearchParams({...searchParams, appid:API_KEY});



                  return fetch(url)
                  .then((res)=>res.json());

                  
};

const formatCurrentWeather=(data)=>{
                  const {
                  coord:{lat,lon}  ,
                  main:{temp,feels_like,temp_min,temp_max,humidity},
                  name,
                  dt,
                  sys:{country,sunrise,sunset},
                  weather,
                  wind:{speed}
                  }=data;

           const {main:details,icon}=weather[0];
           
           
           return {lat,lon,temp,feels_like,temp_min,temp_max,
                  humidity,name,dt,country,sunrise,sunset,details,icon,speed,
};
};

const formatForecastWeather=(data)=>{
                  let {timezone,daily,hourly}=data;
                  daily=daily.slice(1,6).map(d=>{
                                    return{
                                       title:formatToLocalTime(d.dt,timezone,'ccc'),
                                       temp:d.temp.day,
                                       icon:d.weather[0].icon,               
                                    };
                  });


                  hourly=daily.slice(1,6).map(d=>{
                                    return{
                                       title:formatToLocalTime(d.dt,timezone,'hh:mm a'),
                                       temp:d.temp.day,
                                       icon:d.weather[0].icon,               
                                    };
                  });

                return {timezone,daily,hourly};  
};

const getFormattedWeatherData= async (searchParams)=>{
                  const formattedCurrentWeather= await getWeatherData(
                 'weather',
                  searchParams)
                  .then(formatCurrentWeather);
                  

            const {lat,lon}=formatCurrentWeather;
            
            
            const formattedForecastWeather=await getWeatherData("onecall",{
                  lat,
                  lon,
                  exclude:"current,minutely,alerts",
                  units:searchParams.units,
            }).then(formatForecastWeather);

            return {...formattedCurrentWeather, ...formattedForecastWeather
} ;
};

const formatToLocalTime = (
                  secs,
                  zone,
                  format = "cccc,dd LLL yyyy' | Local time: 'hh:mm a"
                  )=> DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode=(code)=>
         `http://openweathermap.org/img/wn/${code}@2x.png`;
      
         

 export default getFormattedWeatherData;

 //export { Duration, Interval, Info, Zone, FixedOffsetZone, IANAZone, InvalidZone, LocalZone };

 //export {DateTime};
 export {formatToLocalTime,iconUrlFromCode};
 //export {formatForcastWeather};


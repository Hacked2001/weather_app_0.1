
//Importing the dependencies;
import React, { useState } from 'react';
import { UilSearch } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';

const Inputs = ( {setQuery,units,setUnits}) => {
 const[city,setCity]=useState("");  
 
const handleUnitsChange=(e)=>{
                  const selectedUnit=e.currentTarget.name;
                  if(units!==selectedUnit) setUnits(selectedUnit);
} ;

 
 const handleSearchClick=()=>{
                  if(city !=="") setQuery({q:city})
 };

 const handleLocationClick=()=>{
                  if(navigator.geolocation){
                             toast.info("Fetching users location.")       
                              navigator.geolocation.getCurrentPosition((position)=>{
                                    toast.success("Location fetched!")
                                    let lat=position.coords.latitude;
                                    let lon=position.coords.longitude;

                                    setQuery({
                                               lat,
                                               lon,       
                                    });


                              });      
                  }
 };
  

  return (
<div className='flex flex-row justify-center my-6'>
           <div className=' flex flex-row w-3/4 items-center justify-center space-x-4'>

          <input 
          value={city}
          onChange={(e)=>setCity(e.currentTarget.value)}
          type="text" 
          className='text-xl font-light p-2 w-full shodow-xl focus:outline-none capitalize placeholder:lowercase' 
          placeholder='Search for city....'
           />

           <UilSearch size={25} 
           onClick={handleSearchClick}
           className='text-white cursor-pointer transition ease-out hover:scale-125'  />

           <UilLocationPoint 
           onClick={handleLocationClick}
           size={25} 
           className='text-white cursor-pointer transition ease-out hover:scale-125'   />
</div> 

<div className='flex flex-row w-1/4 items-center justify-center'>
<button 
name='metric '
 className='text-xl text-white font-light hover:scale-125 transition ease-in-out'
onClick={handleUnitsChange}
 >
°C
</button> 
<p className='text-xl text-white mx-1'> | </p>
<button 
name='imperial ' 
className='text-xl text-white font-light transition ease-in-out hover:scale-125'
onClick={handleUnitsChange}
>
°F
</button>                 
</div>
</div>
  );
}

export default Inputs;
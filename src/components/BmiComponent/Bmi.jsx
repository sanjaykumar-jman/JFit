import React, { useState } from 'react'
import '../../css_files/Bmi.css'
import low_bmi from '../../images/low_bmi.png'
import high_bmi from '../../images/high_bmi.png'
import normal_bmi from '../../images/normal_bmi.png'
import extreme_bmi from '../../images/extreme_bmi.png'
import { div } from 'framer-motion/client'
const Bmi = () => {
    const[num,setnum]=useState({
        name: "Your"
      })
      const [height,setheight]=useState()
      const [weight,setweight]=useState()
      const [cur_bmi,setBmi]=useState()
      function calculate(){
    
        let bmi = (weight/((height/100)**2)).toFixed(1);
        var result = ''
    
        if(bmi<18.5){
          result = 'Underweight';
            setBmi(low_bmi)
           }else if(18.5<=bmi&&bmi<=24.9){
            
            setBmi(normal_bmi)
          result = 'Healthy';
           }else if(25<=bmi&&bmi<=29.9){
            setBmi(high_bmi)
          result = 'Overweight';
           }else if(30<=bmi&&bmi<=34.9){
            setBmi(extreme_bmi)
          result = 'Obese';
           }else if(35<=bmi){
            setBmi(extreme_bmi)
          result = 'Extremely obese'
           }
    
        setnum(prev =>
          ({...prev,height:height,weight:weight,bmi:bmi,result:result}))
        }
      console.log(num)
      return (
        <div className="App">
          <div className="wrapper">
        <h1>BMI Calculator</h1>
        <h3>Height</h3>
        <input type='text' placeholder='enter height in cm' onChange={(e)=>setheight(e.target.value)} className='input'></input>
        <h3>Weight</h3>
        <input type='text'placeholder='enter weight in kg' onChange={(e)=>setweight(e.target.value)} className='input'></input>
        <br/>
        <br></br>
        <button onClick={calculate}>Calculate</button>
        {num.result ? 
        <div> 
          <h1 className='text-green-500'>{num.result}</h1>
           <img src={cur_bmi} className='h-[340px] mx-auto mt-3'/>
        </div>
           :''}
        </div>
        </div>
      );
}

export default Bmi
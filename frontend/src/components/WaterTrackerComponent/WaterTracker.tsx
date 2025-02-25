import React, { useState } from 'react'
import BigCup from './BigCup'
import SmallCups from './SmallCups'
import Message from './Message'
import '../../css_files/WaterTracker.css'

const WaterTracker = () => {
    const [userGoal, setUserGoal] = useState(10)
    const [defaultGoal, setDefaultGoal] = useState(10)
    const [currentValue, setCurrentValue] = useState(0)
  
    const onSubmitUserGoal = (e) => {
      e.preventDefault();
      setDefaultGoal(userGoal);
    }
  
    const onChangeUserGoal = (event) => {
      setUserGoal(parseInt(event.target.value) || 0);
    }
  
    const handleChange = (value, ) => {
      setCurrentValue(parseInt(currentValue + value) || 0);
    }
  
    return (
      <div className='body'>
      <div className='main-wrapper body' >
        <h3 className='title'>Water Tracker</h3>
        <form className='form' onSubmit={onSubmitUserGoal}>
          <label className='goal-label' >Your goal:
            <input type="number" min="1" max="15" value={userGoal} onChange={onChangeUserGoal} className='input1 text-black w-[40px]' />
          </label>
          <button className="btn" type="submit">Submit</button>
        </form>
        <Message goal={defaultGoal} currentValue={currentValue}  />
        <div className='cups-wrapper'>
          <BigCup goal={defaultGoal} currentValue={currentValue} />
          <SmallCups goal={defaultGoal} handleChange={handleChange}  />
        </div>
      </div>
      </div>
    )
  
  }

export default WaterTracker
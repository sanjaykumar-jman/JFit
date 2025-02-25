import React from 'react'
import Bmi from "../../components/BmiComponent/Bmi"
import Sleep from '@/components/SleepComponent/Sleep'
import WaterTracker from '@/components/WaterTrackerComponent/WaterTracker'
import { Sidebar } from '@/components/layout/Sidebar'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen bg-gray-100 p-4 md:p-8 gap-4 " style={{width:"100vw", height:"100vh"}}>
      
      {/* Sidebar (Takes 1 column in medium+ screens) */}
      <div>
        <Sidebar />
      </div>

      {/* Main Content (Takes 2 columns in medium+ screens) */}
      <main className="flex flex-col gap-4 md:col-span-2 "  >
        
        {/* Grid Container */}
        <div className="grid grid-cols-2 gap-3 bg-gray-200 p-4 rounded-lg">
          <div className="bg-white p-4 rounded-lg text-center font-bold text-gray-800 shadow-md">
            Your BMI
          </div>
          <div className="bg-white p-4 rounded-lg text-center font-bold text-gray-800 shadow-md">
            Steps taken
          </div>
          <div className="bg-white p-4 rounded-lg text-center font-bold text-gray-800 shadow-md">
            Water Intake
          </div>
          <div className="bg-white p-4 rounded-lg text-center font-bold text-gray-800 shadow-md">
            Sleep Time
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Sleep /> 
          <WaterTracker />  
        </div>

    
      </main>
      
    </div>
  )
}

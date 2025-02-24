import React from 'react'
// import "./Home.scss"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-8">
      
      <main className="flex flex-col gap-4 mt-5">
        
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

        {/* Sections */}
        <div className="bg-white p-4 rounded-lg text-center font-bold text-gray-800 shadow-md">
          Calorie Tracker
        </div>
        <div className="bg-white p-4 rounded-lg text-center font-bold text-gray-800 shadow-md">
          Exercise Planner
        </div>
        <div className="bg-white p-4 rounded-lg text-center font-bold text-gray-800 shadow-md">
          Section
        </div>

      </main>
    </div>
  );
}

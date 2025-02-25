import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
// import WeekProgress from "./WeekProgress";
 
interface StepsData {
  stepsToday: number;
}
 
const StepsDisplay: React.FC = () => {
  const [steps, setSteps] = useState<number>(3000);
  const [calories, setCalories] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
 
//   useEffect(() => {
//     const eventSource = new EventSource("http://localhost:5000/get-steps/2");
 
//     eventSource.onmessage = (event: MessageEvent) => {
//       try {
//         const data: StepsData = JSON.parse(event.data);
//         if (data.stepsToday !== undefined) {
//           setSteps(data.stepsToday);
//           setCalories(parseFloat((data.stepsToday * 0.04).toFixed(2)));
//           setDistance(parseFloat(((data.stepsToday * 0.0008)).toFixed(2))); // Assuming 1 step = 0.8m
//         }
//       } catch (err) {
//         setError("Error parsing data");
//       }
//     };
 
//     eventSource.onerror = () => {
//       setError("Failed to fetch steps. Ensure Google Fit is connected.");
//       eventSource.close();
//     };
 
//     return () => {
//       eventSource.close();
//     };
//   }, []);
 
  return (
    <AppLayout>
      <div className="flex flex-col gap-8 items-center justify-start animate-fade-in w-full h-screen p-8">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Steps Tracker
          </h2>
          <p className="mt-1 text-3xl font-bold tracking-tight">
            Keep Walking and Burn Calories!
          </p>
        </div>
 
        <div className="flex items-center justify-center w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
          {/* Circular Step Counter */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full">
              <circle cx="50%" cy="50%" r="90" stroke="#e0e0e0" strokeWidth="12" fill="none" />
              <circle
                cx="50%"
                cy="50%"
                r="90"
                stroke="url(#progressGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray="565"
                strokeDashoffset={565 - (steps / 10000) * 565}
                strokeLinecap="round"
                transform="rotate(-90 128 128)"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#200f7b" />
                  <stop offset="100%" stopColor="#961aae" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-xl font-bold text-gray-800">
              {steps} Steps
            </span>
          </div>
 
          {/* Calories and Distance */}
          <div className="ml-10 flex flex-col items-start text-gray-800">
            <p className="text-2xl font-semibold">{calories} kcal</p>
            <p className="text-lg">Calories Burned</p>
            <p className="mt-4 text-2xl font-semibold">{distance} km</p>
            <p className="text-lg">Distance Walked</p>
          </div>
        </div>
 
        {/* Show error message if data fails to load */}
        {/* {error && <div className="text-red-600 font-semibold mt-4">{error}</div>} */}
 
        {/* <WeekProgress /> */}
      </div>
    </AppLayout>
  );
};
 
export default StepsDisplay;
 
 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AppLayout } from "@/components/layout/AppLayout";
// import WeekProgress from "./WeekProgress";
 
// interface StepsData {
//   stepsToday: number;
// }
 
// const StepsDisplay: React.FC = () => {
//   const [steps, setSteps] = useState<number>(0);
//   const [calories, setCalories] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);
 
//   useEffect(() => {
//     const eventSource = new EventSource("http://localhost:5000/get-steps/2");
 
//     eventSource.onmessage = (event: MessageEvent) => {
//       try {
//         const data: StepsData = JSON.parse(event.data);
//         if (data.stepsToday !== undefined) {
//           setSteps(data.stepsToday);
//           setCalories(parseFloat((data.stepsToday * 0.04).toFixed(2)));
//         }
//       } catch (err) {
//         setError("Error parsing data");
//       }
//     };
 
//     eventSource.onerror = () => {
//       setError("Failed to fetch steps. Ensure Google Fit is connected.");
//       eventSource.close();
//     };
 
//     return () => {
//       eventSource.close();
//     };
//   }, []);
 
//   return (
//     <AppLayout>
//         <div className="flex flex-col gap-8 animate-fade-in">
//         <div>
//           <h2 className="text-base font-semibold leading-7 text-primary">
//             Steps Tracker
//           </h2>
//           <p className="mt-1 text-3xl font-bold tracking-tight">
//             Keep Walking and burn your Calories!
//           </p>
//         </div>
 
       
 
//             <div className="flex items-center justify-center bg-white p-6 rounded-xl shadow-lg">
//                 {/* Circular Step Counter */}
//                 <div className="relative w-32 h-32 flex items-center justify-center">
//                     <svg className="w-full h-full">
//                         <circle cx="50%" cy="50%" r="48" stroke="#e0e0e0" strokeWidth="10" fill="none" />
//                         <circle
//                         cx="50%"
//                         cy="50%"
//                         r="48"
//                         stroke="#4caf50"
//                         strokeWidth="10"
//                         fill="none"
//                         strokeDasharray="300"
//                         strokeDashoffset={300 - (steps / 10000) * 300}
//                         strokeLinecap="round"
//                         transform="rotate(-90 64 64)"
//                         />
//                     </svg>
//                     <span className="absolute text-lg font-bold text-gray-800">{steps} Steps</span>
//                 </div>
 
//                 {/* Calories Burned Info */}
//                 <div className="ml-6">
//                     <p className="text-xl font-semibold text-gray-700">{calories} kcal</p>
//                     <p className="text-gray-500">Calories Burned</p>
//                 </div>
//             </div>
 
//             {/* Show error message if data fails to load */}
//             {error && <div className="absolute bottom-5 text-red-600 font-semibold">{error}</div>}
//             </div>
         
           
 
         
 
 
//             <WeekProgress/>
   
//     </AppLayout>
//   );
// };
 
// export default StepsDisplay;
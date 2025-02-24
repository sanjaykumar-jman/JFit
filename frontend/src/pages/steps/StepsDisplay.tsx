// import React, { useState, useEffect } from "react";
// import { AppLayout } from "@/components/layout/AppLayout";
// // import WeekProgress from "./WeekProgress";
 
// interface StepsData {
//   stepsToday: number;
// }
 
// const StepsDisplay: React.FC = () => {
//   const [steps, setSteps] = useState<number>(3000);
//   const [calories, setCalories] = useState<number>(0);
//   const [distance, setDistance] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);
 
// //   useEffect(() => {
// //     const eventSource = new EventSource("http://localhost:5000/get-steps/2");
 
// //     eventSource.onmessage = (event: MessageEvent) => {
// //       try {
// //         const data: StepsData = JSON.parse(event.data);
// //         if (data.stepsToday !== undefined) {
// //           setSteps(data.stepsToday);
// //           setCalories(parseFloat((data.stepsToday * 0.04).toFixed(2)));
// //           setDistance(parseFloat(((data.stepsToday * 0.0008)).toFixed(2))); // Assuming 1 step = 0.8m
// //         }
// //       } catch (err) {
// //         setError("Error parsing data");
// //       }
// //     };
 
// //     eventSource.onerror = () => {
// //       setError("Failed to fetch steps. Ensure Google Fit is connected.");
// //       eventSource.close();
// //     };
 
// //     return () => {
// //       eventSource.close();
// //     };
// //   }, []);
 
//   return (
//     <AppLayout>
//       <div className="flex flex-col gap-8 items-center justify-start animate-fade-in w-full h-screen p-8">
//         <div className="text-center">
//           <h2 className="text-base font-semibold leading-7 text-primary">
//             Steps Tracker
//           </h2>
//           <p className="mt-1 text-3xl font-bold tracking-tight">
//             Keep Walking and Burn Calories!
//           </p>
//         </div>
 
//         <div className="flex items-center justify-center w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl">
//           {/* Circular Step Counter */}
//           <div className="relative w-64 h-64 flex items-center justify-center">
//             <svg className="w-full h-full">
//               <circle cx="50%" cy="50%" r="90" stroke="#e0e0e0" strokeWidth="12" fill="none" />
//               <circle
//                 cx="50%"
//                 cy="50%"
//                 r="90"
//                 stroke="url(#progressGradient)"
//                 strokeWidth="12"
//                 fill="none"
//                 strokeDasharray="565"
//                 strokeDashoffset={565 - (steps / 10000) * 565}
//                 strokeLinecap="round"
//                 transform="rotate(-90 128 128)"
//               />
//               <defs>
//                 <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="#200f7b" />
//                   <stop offset="100%" stopColor="#961aae" />
//                 </linearGradient>
//               </defs>
//             </svg>
//             <span className="absolute text-xl font-bold text-gray-800">
//               {steps} Steps
//             </span>
//           </div>
 
//           {/* Calories and Distance */}
//           <div className="ml-10 flex flex-col items-start text-gray-800">
//             <p className="text-2xl font-semibold">{calories} kcal</p>
//             <p className="text-lg">Calories Burned</p>
//             <p className="mt-4 text-2xl font-semibold">{distance} km</p>
//             <p className="text-lg">Distance Walked</p>
//           </div>
//         </div>
 
//         {/* Show error message if data fails to load */}
//         {/* {error && <div className="text-red-600 font-semibold mt-4">{error}</div>} */}
 
//         {/* <WeekProgress /> */}
//       </div>
//     </AppLayout>
//   );
// };
 
// export default StepsDisplay;
 
 
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { AppLayout } from "@/components/layout/AppLayout";
// // import WeekProgress from "./WeekProgress";
 
// // interface StepsData {
// //   stepsToday: number;
// // }
 
// // const StepsDisplay: React.FC = () => {
// //   const [steps, setSteps] = useState<number>(0);
// //   const [calories, setCalories] = useState<number>(0);
// //   const [error, setError] = useState<string | null>(null);
 
// //   useEffect(() => {
// //     const eventSource = new EventSource("http://localhost:5000/get-steps/2");
 
// //     eventSource.onmessage = (event: MessageEvent) => {
// //       try {
// //         const data: StepsData = JSON.parse(event.data);
// //         if (data.stepsToday !== undefined) {
// //           setSteps(data.stepsToday);
// //           setCalories(parseFloat((data.stepsToday * 0.04).toFixed(2)));
// //         }
// //       } catch (err) {
// //         setError("Error parsing data");
// //       }
// //     };
 
// //     eventSource.onerror = () => {
// //       setError("Failed to fetch steps. Ensure Google Fit is connected.");
// //       eventSource.close();
// //     };
 
// //     return () => {
// //       eventSource.close();
// //     };
// //   }, []);
 
// //   return (
// //     <AppLayout>
// //         <div className="flex flex-col gap-8 animate-fade-in">
// //         <div>
// //           <h2 className="text-base font-semibold leading-7 text-primary">
// //             Steps Tracker
// //           </h2>
// //           <p className="mt-1 text-3xl font-bold tracking-tight">
// //             Keep Walking and burn your Calories!
// //           </p>
// //         </div>
 
       
 
// //             <div className="flex items-center justify-center bg-white p-6 rounded-xl shadow-lg">
// //                 {/* Circular Step Counter */}
// //                 <div className="relative w-32 h-32 flex items-center justify-center">
// //                     <svg className="w-full h-full">
// //                         <circle cx="50%" cy="50%" r="48" stroke="#e0e0e0" strokeWidth="10" fill="none" />
// //                         <circle
// //                         cx="50%"
// //                         cy="50%"
// //                         r="48"
// //                         stroke="#4caf50"
// //                         strokeWidth="10"
// //                         fill="none"
// //                         strokeDasharray="300"
// //                         strokeDashoffset={300 - (steps / 10000) * 300}
// //                         strokeLinecap="round"
// //                         transform="rotate(-90 64 64)"
// //                         />
// //                     </svg>
// //                     <span className="absolute text-lg font-bold text-gray-800">{steps} Steps</span>
// //                 </div>
 
// //                 {/* Calories Burned Info */}
// //                 <div className="ml-6">
// //                     <p className="text-xl font-semibold text-gray-700">{calories} kcal</p>
// //                     <p className="text-gray-500">Calories Burned</p>
// //                 </div>
// //             </div>
 
// //             {/* Show error message if data fails to load */}
// //             {error && <div className="absolute bottom-5 text-red-600 font-semibold">{error}</div>}
// //             </div>
         
           
 
         
 
 
// //             <WeekProgress/>
   
// //     </AppLayout>
// //   );
// // };
 
// // export default StepsDisplay;




import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";

const StepCounter = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [deltas, setDeltas] = useState({ x: 0, y: 0, z: 0 });
  let lastX = 0,
    lastY = 0,
    lastZ = 0;
  const threshold = 4;

  const startCounting = () => {
    setStepCount(0);
    setIsCounting(true);
    window.addEventListener("devicemotion", detectMotion);
  };

  const stopCounting = () => {
    setIsCounting(false);
    window.removeEventListener("devicemotion", detectMotion);
  };

  const detectMotion = (event) => {
    if (!isCounting) return;

    let x = event.acceleration.x || 0;
    let y = event.acceleration.y || 0;
    let z = event.acceleration.z || 0;

    let deltaX = Math.abs(x - lastX);
    let deltaY = Math.abs(y - lastY);
    let deltaZ = Math.abs(z - lastZ);

    setDeltas({ x: deltaX, y: deltaY, z: deltaZ });

    if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
      setStepCount((prev) => prev + 1);
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  };

  useEffect(() => {
    return () => window.removeEventListener("devicemotion", detectMotion);
  }, []);

  return (
    <AppLayout>
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#351289] to-[#6E17A0] text-white p-5 h-screen w-screen">
      <h1 className="text-3xl font-bold mb-4">Step Counter</h1>
      <p className="text-xl">Steps: {stepCount}</p>
      <p className="text-lg mt-2">Status: <span className={isCounting ? "text-green-400" : "text-red-400"}>{isCounting ? "Counting..." : "Not Counting"}</span></p>
      <div className="flex gap-4 mt-4">
        <button onClick={startCounting} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">Start</button>
        <button onClick={stopCounting} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">Stop</button>
      </div>
      <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
        <h2 className="text-lg font-semibold">Delta Values:</h2>
        <p>deltaX: {deltas.x.toFixed(2)}</p>
        <p>deltaY: {deltas.y.toFixed(2)}</p>
        <p>deltaZ: {deltas.z.toFixed(2)}</p>
      </div>
    </div>
    </AppLayout>
  );
};

export default StepCounter;

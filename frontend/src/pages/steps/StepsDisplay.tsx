// 

 
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
 
// export default StepsDisplay;\\\


// import { useState, useEffect } from "react";
// import { supabase } from "../../config/supabaseClient"; // Import your Supabase client
// import { motion } from "framer-motion";

// const StepsCounter = () => {
//   const [stepCount, setStepCount] = useState(0);
//   const [goal, setGoal] = useState(10000); // Default goal
//   const [newGoal, setNewGoal] = useState(10000); // Input field for new goal
//   const [isCounting, setIsCounting] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);
//   const threshold = 4;

//   useEffect(() => {
//     getUserId();
//   }, []);

//   useEffect(() => {
//     if (isCounting) {
//       window.addEventListener("devicemotion", detectMotion);
//     } else {
//       window.removeEventListener("devicemotion", detectMotion);
//     }

//     return () => {
//       window.removeEventListener("devicemotion", detectMotion);
//     };
//   }, [isCounting]);

//   // 🔹 Fetch User ID from Supabase
//   const getUserId = async () => {
//     const { data, error } = await supabase.auth.getUser();
//     if (error) {
//       console.error("Error fetching user:", error);
//       return;
//     }
//     setUserId(data?.user?.id || null);
//     if (data?.user?.id) {
//       fetchGoal(data.user.id);
//     }
//   };

//   // 🔹 Fetch existing goal from Supabase
//   const fetchGoal = async (uid: string) => {
//     try {
//       const { data, error } = await supabase
//         .from("steps")
//         .select("goal_steps")
//         .eq("user_id", uid)
//         .maybeSingle(); // 🔹 This ensures it returns `null` if no data is found
  
//       if (error) throw error;
  
//       if (data && data.goal_steps !== undefined) {
//         setGoal(data.goal_steps);
//         setNewGoal(data.goal_steps);
//       } else {
//         console.warn("No goal found, setting default.");
//         setGoal(10000);
//         setNewGoal(10000);
//       }
//     } catch (error) {
//       console.error("Error fetching goal:", error);
//     }
//   };
  
//   // 🔹 Update goal in Supabase
//   const updateGoal = async () => {
//     if (!userId) return;

//     const { error } = await supabase
//       .from("steps")
//       .upsert([{ user_id: userId, goal_steps: newGoal }], { onConflict: "user_id" });

//     if (error) {
//       console.error("Error updating goal:", error);
//     } else {
//       setGoal(newGoal);
//     }
//   };

//   // 🔹 Handle Step Counting
//   const detectMotion = (event: DeviceMotionEvent) => {
//     if (!isCounting) return;

//     let { x = 0, y = 0, z = 0 } = event.acceleration ?? {};

//     if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
//       setStepCount((prev) => prev + 1);
//     }
//   };

//   const startCounting = () => {
//     setStepCount(0);
//     setIsCounting(true);
//   };

//   const stopCounting = () => {
//     setIsCounting(false);
//   };

//   const progress = Math.min((stepCount / goal) * 100, 100);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-[#351289] to-[#6E17A0] text-white p-4">
//       <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 text-center">
//         <h1 className="text-3xl font-bold mb-4">Step Counter</h1>

//         {/* Step Goal Input */}
//         <div className="mb-6">
//           <label className="block text-lg font-semibold mb-2">Set Your Goal</label>
//           <input
//             type="number"
//             className="w-full p-2 border-none rounded-lg text-black bg-gray-100 focus:outline-none"
//             value={newGoal}
//             onChange={(e) => setNewGoal(Number(e.target.value))}
//             placeholder="Enter step goal"
//           />
//           <button
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             onClick={updateGoal}
//           >
//             Set Goal
//           </button>
//         </div>

//         {/* Circular Progress Bar */}
//         <div className="relative w-40 h-40 mx-auto mb-6">
//           <svg className="absolute top-0 left-0 w-full h-full">
//             <circle cx="50%" cy="50%" r="45" stroke="#ddd" strokeWidth="10" fill="none" />
//             <motion.circle
//               cx="50%"
//               cy="50%"
//               r="45"
//               stroke="#4CAF50"
//               strokeWidth="10"
//               fill="none"
//               strokeDasharray="283"
//               strokeDashoffset={283 - (progress / 100) * 283}
//               initial={{ strokeDashoffset: 283 }}
//               animate={{ strokeDashoffset: 283 - (progress / 100) * 283 }}
//               transition={{ duration: 0.5, ease: "easeInOut" }}
//             />
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
//             {stepCount} / {goal} Steps
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex space-x-4 justify-center">
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//             onClick={startCounting}
//           >
//             Start
//           </button>
//           <button
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//             onClick={stopCounting}
//           >
//             Stop
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepsCounter;


import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";

const StepsCounter = () => {
  const [stepCount, setStepCount] = useState(0);
  const [goal, setGoal] = useState(10000);
  const [newGoal, setNewGoal] = useState(10000);
  const [isCounting, setIsCounting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [deltaValues, setDeltaValues] = useState({ x: 0, y: 0, z: 0 });

  // Motion Detection Variables
  const threshold = 4;
  let lastX = 0, lastY = 0, lastZ = 0;

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting) {
      window.addEventListener("devicemotion", detectMotion);
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      window.removeEventListener("devicemotion", detectMotion);
      clearInterval(timer);
    }

    return () => {
      window.removeEventListener("devicemotion", detectMotion);
      clearInterval(timer);
    };
  }, [isCounting]);

  // 🔹 Fetch User ID from Supabase
  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return;
    }
    setUserId(data?.user?.id || null);
    if (data?.user?.id) {
      fetchGoal(data.user.id);
      fetchStepCount(data.user.id);
    }
  };

  // 🔹 Fetch goal from Supabase
  const fetchGoal = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("steps")
        .select("goal_steps")
        .eq("user_id", uid)
        .maybeSingle();

      if (error) throw error;
      if (data?.goal_steps !== undefined) {
        setGoal(data.goal_steps);
        setNewGoal(data.goal_steps);
      }
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  // 🔹 Fetch step count from Supabase
  const fetchStepCount = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from("steps")
        .select("step_count")
        .eq("user_id", uid)
        .maybeSingle();

      if (error) throw error;
      if (data?.step_count !== undefined) {
        setStepCount(data.step_count);
      }
    } catch (error) {
      console.error("Error fetching step count:", error);
    }
  };

  // 🔹 Update step count in Supabase
  const updateStepCount = async (steps: number) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("steps")
        .upsert([{ user_id: userId, step_count: steps }], { onConflict: "user_id" });

      if (error) throw error;
    } catch (error) {
      console.error("Error updating step count:", error);
    }
  };

  // 🔹 Update goal in Supabase
  const updateGoal = async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("steps")
        .upsert([{ user_id: userId, goal_steps: newGoal }], { onConflict: "user_id" });

      if (error) throw error;
      setGoal(newGoal);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  // 🔹 Detect Motion and Count Steps
  const detectMotion = (event: DeviceMotionEvent) => {
    if (!isCounting) return;

    let { x = 0, y = 0, z = 0 } = event.acceleration ?? {};

    let deltaX = Math.abs(x - lastX);
    let deltaY = Math.abs(y - lastY);
    let deltaZ = Math.abs(z - lastZ);

    setDeltaValues({ x: deltaX, y: deltaY, z: deltaZ });

    if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
      setStepCount((prev) => {
        const newStepCount = prev + 1;
        updateStepCount(newStepCount);
        return newStepCount;
      });
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  };

  // 🔹 Start Counting (Fix: Keeps saved step count)
  const startCounting = () => {
    setElapsedTime(0);
    setIsCounting(true);
  };

  // 🔹 Stop Counting
  const stopCounting = () => {
    setIsCounting(false);
  };

  const progress = Math.min((stepCount / goal) * 100, 100);

  return (
   <AppLayout>
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-[#351289] to-[#6E17A0] text-white p-4">
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Step Counter</h1>

        {/* Step Goal Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Set Your Goal</label>
          <input
            type="number"
            className="w-full p-2 border-none rounded-lg text-black bg-gray-100 focus:outline-none"
            value={newGoal}
            onChange={(e) => setNewGoal(Number(e.target.value))}
            placeholder="Enter step goal"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={updateGoal}
          >
            Set Goal
          </button>
        </div>

        {/* Timer & Status */}
        <div className="mb-4 text-lg font-semibold">
          ⏱️ Time: {Math.floor(elapsedTime / 60)}:{elapsedTime % 60 < 10 ? `0${elapsedTime % 60}` : elapsedTime % 60}
        </div>
        <div className={`mb-4 text-lg font-bold ${isCounting ? "text-green-400" : "text-red-400"}`}>
          {isCounting ? "Recording..." : "Not Recording"}
        </div>

        {/* Delta Values */}
        <div className="mb-4 bg-gray-800 p-4 rounded-lg">
          <p>ΔX: {deltaValues.x.toFixed(2)}</p>
          <p>ΔY: {deltaValues.y.toFixed(2)}</p>
          <p>ΔZ: {deltaValues.z.toFixed(2)}</p>
        </div>

        {/* Circular Progress Bar */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="absolute top-0 left-0 w-full h-full">
            <circle cx="50%" cy="50%" r="45" stroke="#ddd" strokeWidth="10" fill="none" />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45"
              stroke="#4CAF50"
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={283 - (progress / 100) * 283}
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (progress / 100) * 283 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {stepCount} / {goal} Steps
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 justify-center">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={startCounting}>
            Start
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={stopCounting}>
            Stop
          </button>
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default StepsCounter;

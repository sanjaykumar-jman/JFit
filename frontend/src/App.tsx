
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import Auth from "./pages/Auth";

// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import WaterPage from "./pages/water";
// import ExercisePage from "./pages/exercise";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* <Route path="/" element={<Index />} /> */}
//                     <Route path="/" element={<Auth />} />

//           <Route path="/water" element={<WaterPage />} />
//           <Route path="/exercise" element={<ExercisePage />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//       <Toaster />
//       <Sonner />
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


// // {

// // import { Navigate, Outlet } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { supabase } from "../config/supabaseClient";

// // const ProtectedRoute = () => {
// //   const [user, setUser] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const checkUser = async () => {
// //       const { data: { user } } = await supabase.auth.getUser();
// //       setUser(user);
// //       setLoading(false);
// //     };

// //     checkUser();
// //   }, []);

// //   if (loading) return <div className="text-center text-white">Loading...</div>;

// //   return user ? <Outlet /> : <Navigate to="/" />;
// // };

// // export default ProtectedRoute;



// // }


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabaseClient";
import Register from "./pages/Register";

import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WaterPage from "./pages/water";
import ExercisePage from "./pages/exercise";
import FoodSearch from "./pages/food_calorie/FoodSearch";
import Dashboard from "./pages/dashboard/Dashboard";
import StepsDisplay from "./pages/steps/StepsDisplay";
import Bmi from "./components/BmiComponent/Bmi";
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return user ? children : <Navigate to="/" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/water"
            element={
              <ProtectedRoute>
                <WaterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />

<Route
            path="/food_calorie"
            element={
              <ProtectedRoute>
                <FoodSearch/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/steps"
            element={
              <ProtectedRoute>
                <StepsDisplay/>
              </ProtectedRoute>
            }
          />

        <Route
            path="/bmi"
            element={
              <ProtectedRoute>
                <Bmi/>
              </ProtectedRoute>
            }
          />
          
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

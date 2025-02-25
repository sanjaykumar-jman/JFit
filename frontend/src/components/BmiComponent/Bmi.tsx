import React, { useState } from "react";
import "../../css_files/Bmi.css";
import low_bmi from "../../images/low_bmi.png";
import high_bmi from "../../images/high_bmi.png";
import normal_bmi from "../../images/normal_bmi.png";
import extreme_bmi from "../../images/extreme_bmi.png";
import { AppLayout } from "../layout/AppLayout";

interface BmiResult {
  name: string;
  height?: number;
  weight?: number;
  bmi?: number;
  result?: string;
}

const Bmi: React.FC = () => {
  const [num, setNum] = useState<BmiResult>({ name: "Your" });
  const [height, setHeight] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();
  const [curBmi, setCurBmi] = useState<string | null>(null);

  function calculate() {
    if (!height || !weight) return;

    const bmi = parseFloat((weight / ((height / 100) ** 2)).toFixed(1));
    let result = "";

    if (bmi < 18.5) {
      result = "Underweight";
      setCurBmi(low_bmi);
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = "Healthy";
      setCurBmi(normal_bmi);
    } else if (bmi >= 25 && bmi <= 29.9) {
      result = "Overweight";
      setCurBmi(high_bmi);
    } else if (bmi >= 30) {
      result = "Obese";
      setCurBmi(extreme_bmi);
    }

    setNum((prev) => ({
      ...prev,
      height,
      weight,
      bmi,
      result,
    }));
  }

  return (
    <AppLayout>
      <div className="flex flex-col  p-10 mt-5 mr-[90px]" >
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-5xl mx-auto">
          {/* Title */}
          <div className="mb-8 ">
            <h2 className="text-2xl font-semibold text-blue-600 text-center">BMI Calculator</h2>
            <p className="mt-1 text-3xl font-bold text-gray-800  text-center">Track your BMI here!</p>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Height (cm)</label>
              <input
                type="number"
                min="1"
                placeholder="Enter height"
                onChange={(e) => setHeight(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Weight (kg)</label>
              <input
                type="number"
                min="1"
                placeholder="Enter weight"
                onChange={(e) => setWeight(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="mt-6">
            <button
              onClick={calculate}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition"
            >
              Calculate BMI
            </button>
          </div>

          {/* BMI Result */}
          {num.result && (
            <div className="mt-8 text-center">
              <h1 className="text-2xl font-semibold text-gray-800">{num.result}</h1>
              {curBmi && <img src={curBmi} className="h-48 mx-auto mt-4" />}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Bmi;

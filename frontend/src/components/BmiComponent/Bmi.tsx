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
    <>
    <AppLayout>
    <div className="App flex flex-col">
        <div className="text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">
                BMI Calculator
              </h2>
              <p className="mt-1 text-3xl text-black font-bold tracking-tight">
                Track your BMI here!
              </p>
            </div>
      <div className="wrapper">
        <h1>BMI Calculator</h1>

        <h3>Height</h3>
        <input
          type="number"
          placeholder="Enter height in cm"
          onChange={(e) => setHeight(Number(e.target.value))}
          className="input"
        />

        <h3>Weight</h3>
        <input
          type="number"
          placeholder="Enter weight in kg"
          onChange={(e) => setWeight(Number(e.target.value))}
          className="input"
        />

        <br />
        <br />

        <button onClick={calculate}>Calculate</button>

        {num.result && (
          <div>
            <h1 className="text-green-500">{num.result}</h1>
            {curBmi && <img src={curBmi} className="h-[340px] mx-auto mt-3" />}
          </div>
        )}
      </div>
    </div>
    </AppLayout>
    </>
  );
};

export default Bmi;

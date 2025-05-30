import React, { useState } from "react";
import SliderWithMarks from "../common/SliderWithMarks";

const marks = [
  { label: "₹ 50K", value: 50000 },
  { label: "₹ 1Lac", value: 100000 },
  { label: "₹ 1.5Lac", value: 150000 },
  { label: "₹ 2Lac", value: 200000 },
  { label: "₹ 2.5Lac", value: 250000 },
  { label: "₹ 3Lac", value: 300000 },
  { label: "₹ 3.5Lac", value: 350000 },
  { label: "₹ 4Lac", value: 400000 },
  { label: "₹ 4.5Lac", value: 450000 },
  { label: "₹ 5Lac", value: 500000 },
];

const InvestmentSliderWithoutReset = () => {
  const [investment, setInvestment] = useState(150000);

  return (
    <SliderWithMarks
      title="Investment"
      value={investment}
      onChange={setInvestment}
      marks={marks}
      min={50000}
      max={500000}
      step={50000}
      estimateInfo="With above budget your estimate audience size would be 1,20,000 - 2,20,000."
      showResetButton={false}
    />
  );
};

export default InvestmentSliderWithoutReset;

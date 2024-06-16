import React, { useState, ChangeEvent } from "react";

const StepDropdown: React.FC = () => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10);
  const [steps, setSteps] = useState<number[]>([]);

  const getValidSteps = (min: number, max: number): number[] => {
    const distance = max - min;
    const steps: number[] = [];

    for (let step = 1; step <= distance; step++) {
      if (distance % step === 0) {
        steps.push(step);
      }
    }

    return steps;
  };

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    setMin(newMin);
    setSteps(getValidSteps(newMin, max));
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    setMax(newMax);
    setSteps(getValidSteps(min, newMax));
  };

  const handleStepChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected step: ", e.target.value);
  };

  return (
    <div>
      <div>
        <label>
          Min:
          <input type="number" value={min} onChange={handleMinChange} />
        </label>
      </div>
      <div>
        <label>
          Max:
          <input type="number" value={max} onChange={handleMaxChange} />
        </label>
      </div>
      <div>
        <label>
          Step:
          <select onChange={handleStepChange}>
            {steps.map((step, index) => (
              <option key={index} value={step}>
                {step}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default StepDropdown;

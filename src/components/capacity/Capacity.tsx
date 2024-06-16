import * as _ from "lodash";
import React, { useState } from "react";
import "./Capacity.css";

interface CapacityProps {}
type TInputValue = {
  initValue: string;
  min: string;
  max: string;
};

const Capacity: React.FC<CapacityProps> = () => {
  const [inputValue, setInputValue] = useState<TInputValue>({
    initValue: "",
    min: "",
    max: "",
  });
  const [errorMessages, setErrorMessages] = useState<Partial<TInputValue>>({});
  const [stepLabels, setStepLabels] = useState<number[]>([]);
  const [selectedStepLabel, setSelectedStepLabel] = useState<number | null>(
    null
  );
  const [steps, setSteps] = useState<number[]>([]);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [prevStepLabels, setPrevStepLabels] = useState<number[]>([]);

  const handleOnchange = (field: keyof TInputValue) => (value: string) => {
    const newInputValue = {
      ...inputValue,
      [field]: value,
    };
    setInputValue(newInputValue);
  };

  console.log("input value : ", inputValue);

  const handleBlur = (field: keyof TInputValue) => (value: string) => {
    validate(inputValue, field);
  };

  const handleStepLabelChange = (value: string) => {
    const stepLabel = Number(value);
    setSelectedStepLabel(stepLabel);

    const newSteps = calculateSteps(stepLabel);
    setSteps(newSteps);

    if (newSteps.length > 0) {
      setSelectedStep(newSteps[0]);
    } else {
      setSelectedStep(null);
    }
  };

  const handleStepChange = (value: string) => {
    setSelectedStep(Number(value));
  };

  const validate = (values: TInputValue, field: keyof TInputValue) => {
    const { initValue, min, max } = values;
    const errors: Partial<TInputValue> = {};

    if (!values[field]) {
      errors[field] = "Value is required";
      setStepLabels([]);
      setSteps([]);
    } else {
      const initValueNumber = Number(initValue);
      const minNumber = Number(min);
      const maxNumber = Number(max);
      console.log("🚀 ~ validate ~ maxNumber:", maxNumber);

      if (isNaN(initValueNumber) || isNaN(minNumber) || isNaN(maxNumber)) {
        errors[field] = "All inputs must be numbers";
      } else {
        if (field === "min" && minNumber >= maxNumber) {
          errors[field] = "min must be less than max";
        }

        if (field === "max" && minNumber >= maxNumber) {
          errors[field] = "max must be greater than min";
        }

        if (
          field === "initValue" &&
          (initValueNumber < minNumber || initValueNumber > maxNumber)
        ) {
          errors[field] = "initValue must be between min and max";
        }

        if (field === "min" || field === "max") {
          const newStepLabels = calculateStepLabels(minNumber, maxNumber);
          setStepLabels(newStepLabels);
          console.log("check list label step new", newStepLabels);
          console.log("check list label step old", prevStepLabels);

          if (_.isEqual(prevStepLabels, newStepLabels)) {
            return;
          } else {
            setPrevStepLabels(newStepLabels);
            if (newStepLabels.length > 0) {
              const firstStepLabel = newStepLabels[0];
              setSelectedStepLabel(firstStepLabel);
              const newSteps = calculateSteps(firstStepLabel);
              setSteps(newSteps);

              if (newSteps.length > 0) {
                setSelectedStep(newSteps[0]);
              } else {
                setSelectedStep(null);
              }
            } else {
              setStepLabels([]);
              setSelectedStepLabel(null);
              setSteps([]);
              setSelectedStep(null);
            }
          }
        }
      }
    }

    setErrorMessages(errors);
  };

  const calculateStepLabels = (min: number, max: number): number[] => {
    const stepLabels: number[] = [];
    const range = max - min;

    if (range <= 0) return stepLabels;

    for (
      let step = Math.ceil(range / 20);
      step <= Math.floor(range / 2);
      step++
    ) {
      if (range % step === 0) {
        stepLabels.push(step);
      }
    }

    return stepLabels;
  };

  const calculateSteps = (stepLabel: number): number[] => {
    const steps: number[] = [];

    for (let i = 1; i <= 10; i++) {
      const step = stepLabel / i;
      if (stepLabel % step === 0) {
        steps.push(parseFloat(step.toFixed(3)));
      }
    }

    return steps;
  };

  return (
    <div className="container">
      <div className="input-group">
        <label htmlFor="initValue">initValue</label>
        <input
          type="text"
          value={inputValue.initValue}
          onChange={(e) => handleOnchange("initValue")(e.target.value)}
          onBlur={(e) => handleBlur("initValue")(e.target.value)}
        />
        {errorMessages.initValue && (
          <div className="error">{errorMessages.initValue}</div>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="min">min</label>
        <input
          type="text"
          value={inputValue.min}
          onChange={(e) => handleOnchange("min")(e.target.value)}
          onBlur={(e) => handleBlur("min")(e.target.value)}
        />
        {errorMessages.min && <div className="error">{errorMessages.min}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="max">max</label>
        <input
          type="text"
          value={inputValue.max}
          onChange={(e) => handleOnchange("max")(e.target.value)}
          onBlur={(e) => handleBlur("max")(e.target.value)}
        />
        {errorMessages.max && <div className="error">{errorMessages.max}</div>}
      </div>
      <div className="input-group">
        <label htmlFor="stepLabel">stepLabel</label>
        <select
          onChange={(e) => handleStepLabelChange(e.target.value)}
          value={selectedStepLabel || ""}
        >
          <option value="">Select stepLabel</option>
          {stepLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="step">step</label>
        <select
          onChange={(e) => handleStepChange(e.target.value)}
          value={selectedStep || ""}
        >
          <option value="">Select step</option>
          {steps.map((step) => (
            <option key={step} value={step}>
              {step}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Capacity;

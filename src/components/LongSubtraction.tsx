import React, { useState, useEffect } from "react";
import "./LongSubtraction.css"; // Import CSS để style

interface LongSubtractionProps {}

const LongSubtraction: React.FC<LongSubtractionProps> = () => {
  const [minuend, setMinuend] = useState<string>("");
  const [subtrahend, setSubtrahend] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [expression, setExpression] = useState<string>("");
  const [originalExpression, setOriginalExpression] = useState<string>("");

  useEffect(() => {
    // Convert input strings to numbers and handle empty input
    const minuendNumber = parseFloat(minuend) || 0;
    const subtrahendNumber = parseFloat(subtrahend) || 0;

    // Perform subtraction
    const resultNumber = minuendNumber - subtrahendNumber;

    // Update state
    setResult(resultNumber.toString());
    setExpression(`${minuend} - ${subtrahend} = ${resultNumber}`);
    setOriginalExpression(`${minuend} - ${subtrahend} = ${resultNumber}`);
  }, [minuend, subtrahend]); // Recompute result whenever minuend or subtrahend changes

  const handleCellClick = (type: string, index: number) => {
    let newExpression = originalExpression;
    if (type === "minuend") {
      setMinuend(
        minuend.substring(0, index) + "X" + minuend.substring(index + 1)
      );
      newExpression =
        newExpression.substring(0, index) +
        "X" +
        newExpression.substring(index + 1);
    } else if (type === "subtrahend") {
      setSubtrahend(
        subtrahend.substring(0, index) + "X" + subtrahend.substring(index + 1)
      );
      newExpression =
        newExpression.substring(0, index) +
        "X" +
        newExpression.substring(index + 1);
    } else if (type === "result") {
      setResult(result.substring(0, index) + "X" + result.substring(index + 1));
      newExpression =
        newExpression.substring(0, index) +
        "X" +
        newExpression.substring(index + 1);
    }

    setExpression(newExpression);
  };

  // Helper function to render digits in table cells
  const renderDigits = (digits: string[], type: string) => {
    return digits.map((digit, index) => (
      <td key={index} onClick={() => handleCellClick(type, index)}>
        {digit}
      </td>
    ));
  };

  const minuendDigits = minuend.split("");
  const subtrahendDigits = subtrahend.split("");
  const resultDigits = result.split("");

  const maxLength = Math.max(
    minuendDigits.length,
    subtrahendDigits.length,
    resultDigits.length
  );

  return (
    <div>
      <div>
        <input
          type="text"
          value={minuend}
          onChange={(e) => setMinuend(e.target.value)}
          placeholder="Số bị trừ"
        />
        <input
          type="text"
          value={subtrahend}
          onChange={(e) => setSubtrahend(e.target.value)}
          placeholder="Số trừ"
        />
      </div>
      <div className="vertical-subtraction">
        <table>
          <tbody>
            <tr>{renderDigits(minuendDigits, "minuend")}</tr>
            <tr>{renderDigits(subtrahendDigits, "subtrahend")}</tr>
            <tr>
              <td colSpan={maxLength}>-</td>
            </tr>
            <tr>{renderDigits(resultDigits, "result")}</tr>
          </tbody>
        </table>
      </div>
      <div className="expression">
        <span>{expression}</span>
      </div>
    </div>
  );
};

export default LongSubtraction;

import React from "react";

interface RulerProps {
  min: number;
  max: number;
  stepLarge: number;
  stepSmall: number;
  y1: number;
  y2: number;
  waterLevel: number; // Giá trị mực nước
  scale: number; // Scale factor
}

const Ruler: React.FC<RulerProps> = ({
  min,
  max,
  stepLarge,
  stepSmall,
  y1,
  y2,
  waterLevel,
  scale,
}) => {
  // Tính toán khoảng cách giữa các gạch lớn và gạch nhỏ
  const totalHeight = y2 - y1;
  const numLargeSteps = (max - min) / stepLarge;
  const numSmallSteps = (max - min) / stepSmall;

  const largeStepHeight = totalHeight / numLargeSteps;
  const smallStepHeight = totalHeight / numSmallSteps;

  const xOfText = (scale: number): number => {
    switch (scale) {
      case 1:
        return 140 * scale;
      case 0.5:
        return 150 * scale;
      case 1.5:
        return 130 * scale;
      default:
        return 140;
    }
  };

  // Tạo các path cho gạch lớn và gạch nhỏ
  const largeTicks = [];
  const smallTicks = [];
  const labels = [];

  for (let i = 0; i <= numLargeSteps; i++) {
    const y = y2 - i * largeStepHeight;
    largeTicks.push(
      <path
        key={`large-${i}`}
        fill="none"
        stroke="#000000"
        d={`M${100 * scale},${y * scale} L${120 * scale},${y * scale}`}
        strokeWidth="2"
      />
    );
    labels.push(
      <text
        key={`label-${i}`}
        x={xOfText(scale)}
        y={y * scale + 2}
        fontSize="16"
        fontWeight="600"
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {min + i * stepLarge}
      </text>
    );
  }

  for (let i = 0; i <= numSmallSteps; i++) {
    const y = y2 - i * smallStepHeight;
    smallTicks.push(
      <path
        key={`small-${i}`}
        fill="none"
        stroke="#000000"
        d={`M${110 * scale},${y * scale} L${120 * scale},${y * scale}`}
        strokeWidth="1.2"
      />
    );
  }

  // Tính toán tọa độ của mực nước
  const waterHeight = ((waterLevel - min) / (max - min)) * totalHeight + 8.7;
  const waterY = y2 - waterHeight;

  // Kích thước của cốc thủy tinh
  const cupWidth = 476 * scale;
  const cupHeight = 648 * scale;
  const waterWidth = 355 * scale;

  // Gradient cho màu nước
  const waterGradientId = `water-gradient-${Math.random()}`;

  return (
    <svg
      width={cupWidth + 40}
      height={cupHeight}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient cho màu nước */}
      <defs>
        <linearGradient id={waterGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B3E5FC" /> {/* Màu nhạt hơn */}
          <stop offset="100%" stopColor="#E1F5FE" /> {/* Màu nhạt hơn */}
        </linearGradient>
      </defs>

      {/* Mực nước */}
      <rect
        x={80 * scale}
        y={waterY * scale}
        width={waterWidth}
        height={waterHeight * scale}
        fill={`url(#${waterGradientId})`}
      />

      {/* Vòng tròn 3D trên đầu mực nước */}
      <ellipse
        cx={80 * scale + waterWidth / 2}
        cy={waterY * scale}
        rx={waterWidth / 2}
        ry={waterWidth * 0.05}
        fill={`url(#${waterGradientId})`}
      />

      {/* Hình ảnh của cốc thủy tinh */}
      <image
        href="https://static.assets.sadlierconnect.com/sc-content/javascript/te_component_v1.12/assests/capacity_n_volume/beaker_background_v1.01.svg"
        x="0"
        y="0"
        width={cupWidth}
        height={cupHeight}
        overflow="hidden"
      />

      {/* Cây thước bên trong cốc */}
      {largeTicks}
      {smallTicks}
      {labels}
    </svg>
  );
};

export default Ruler;

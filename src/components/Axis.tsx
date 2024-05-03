import React from "react";

function Axis({
  x0,
  xAxisY,
  xAxisLength,
  xAxisName,
  y0,
  yAxisLength,
  YAxisName,
  numYTicks = 5,
  dataYMax,
}: {
  x0: number;
  xAxisY: number;
  xAxisLength: number;
  xAxisName?: string;
  y0: number;
  yAxisLength: number;
  YAxisName?: string;
  numYTicks?: number;
  dataYMax: number;
}) {
  return (
    <>
      {/* X axis */}
      <line
        x1={x0}
        y1={xAxisY}
        x2={x0 + xAxisLength}
        y2={xAxisY}
        stroke="grey"
      />
      <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
        {xAxisName}
      </text>

      {/* Y axis */}
      <line x1={x0} y1={y0 + yAxisLength} x2={x0} y2={y0} stroke="grey" />
      {Array.from({ length: numYTicks + 1 }).map((_, index) => {
        const y = y0 + index * (yAxisLength / numYTicks);

        const yValue = (dataYMax - index * (dataYMax / numYTicks)).toFixed(1);

        return (
          <g key={index}>
            <line
              x1={x0}
              y1={y}
              x2={x0 + xAxisLength}
              y2={y}
              stroke="rgba(201, 203, 207, 0.4)"
            />
            <text x={x0 - 5} y={y + 5} textAnchor="end">
              {yValue}
            </text>
          </g>
        );
      })}
      <text x={x0} y={y0 - 8} textAnchor="middle">
        {YAxisName}
      </text>
    </>
  );
}

export default Axis;

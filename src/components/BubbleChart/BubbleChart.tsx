import React, { useCallback } from 'react';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { GridRows, GridColumns } from '@visx/grid';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Circle } from '@visx/shape';
import { useTooltip, TooltipWithBounds } from '@visx/tooltip';

const bgColor = '#f3f3f3';
const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

const BubbleChart = ({ width, height, data, margin = defaultMargin}: BubbleChart.Props) => {
  const {
    showTooltip,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    hideTooltip,
    tooltipData,
  } = useTooltip<BubbleChart.Datum>();

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleLinear<number>({
    domain: [0, 500],
    range: [0, xMax],
  });
  
  const yScale = scaleLinear<number>({
    domain: [0, 500],
    range: [0, yMax],
  });

  const handleShowToolTip = useCallback((event: React.TouchEvent<SVGCircleElement> | React.MouseEvent<SVGCircleElement>, datum: BubbleChart.Datum) => {
    showTooltip({
      tooltipLeft: datum.x,
      tooltipTop: datum.y,
      tooltipData: datum,
    })
  }, [showTooltip])

  const handleCloseToolTip = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  return (
    <>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={bgColor} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={xScale} numTicks={10} />
          <AxisLeft scale={yScale} />
          {
            data.map((circle, i) => (
              <Circle
                cx={circle.x}
                cy={circle.y}
                r={circle.z}
                onMouseOver={(event) => handleShowToolTip(event, circle)}
                onMouseLeave={handleCloseToolTip}
                fill={tooltipData?.x === circle.x ? "#9e9e9e" : "#d4d4d4"}
              />
            ))
          }
        </Group>
      </svg>
      {
        tooltipOpen && tooltipData && tooltipLeft && tooltipTop && (
          <div>
            <TooltipWithBounds left={tooltipLeft + 170} top={tooltipTop + 30}>
              <div>
                <strong>x:</strong> {tooltipData.x}
              </div>
              <div>
                <strong>y:</strong> {tooltipData.y}
              </div>
            </TooltipWithBounds>
          </div>
        )
      }
    </>
  )
}

export default BubbleChart;
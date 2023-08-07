import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';

type BarChartProps = {
  barWidth: number;
  data: any;
  minX: string;
  height?: number;
  width?: number;
  radius?: boolean | true;
};

const BarChart = (props: BarChartProps) => {
  const barWidth = props?.barWidth;
  let barRadius = barWidth ? barWidth / 2 : 0;
  if (props?.radius !== undefined || props.radius) {
    barRadius = 0;
  }
  const tickValues: any = [];
  props?.data.forEach((obj: any) => {
    tickValues.push(obj.x);
  });
  return (
    <div className='w-full'>
      <VictoryChart
        padding={{
          left: barWidth / 1.9,
          right: barWidth / 1.9,
          top: 45,
          bottom: 45,
        }}
        height={props?.height}
        width={props?.width}
      >
        <VictoryBar
          style={{
            labels: {
              fill: ({ datum }: any) =>
                datum.x !== props.minX ? '#263238' : '#FFFFFF',
              fontSize:
                props?.radius === undefined || props?.radius ? 25 : 25 / 1.9,
            },
            data: {
              fill: ({ datum }) =>
                datum.x !== props.minX ? '#DCDCDC' : '#00008B',
              width: barWidth,
            },
          }}
          cornerRadius={{
            topLeft: barRadius,
            bottomLeft: barRadius,
            topRight: barRadius,
            bottomRight: barRadius,
          }}
          data={props?.data}
          labels={({ datum }) => datum.y}
          labelComponent={
            <VictoryLabel
              angle={-90}
              verticalAnchor='middle'
              textAnchor='end'
              dy={0}
              dx={-10}
            />
          }
        />
        <VictoryAxis
          tickValues={tickValues}
          style={{
            tickLabels: {
              fontSize:
                props?.radius === undefined || props?.radius ? 18 : 18 / 1.9,
            },
            axis: { stroke: 'none' },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default BarChart;

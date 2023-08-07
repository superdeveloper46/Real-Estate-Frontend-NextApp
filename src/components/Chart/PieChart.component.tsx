import React from 'react';
import { VictoryLabel, VictoryPie } from 'victory';

type PieChartDataType = {
  data: any;
  colorScale: any;
  labelTitle: string;
  labelContent: string;
};

const PieChart = (props: PieChartDataType) => {
  return (
    <div className='flex w-full'>
      <svg viewBox='40 40 340 340'>
        <VictoryPie
          standalone={false}
          width={400}
          height={400}
          colorScale={props?.colorScale}
          data={props?.data}
          innerRadius={120}
          style={{ labels: { display: 'none' } }}
        />
        <VictoryLabel
          textAnchor='middle'
          style={{
            fontSize: '45px',
            fontFamily: 'Montserrat',
            fontWeight: 700,
          }}
          x={200}
          y={215}
          text={props.labelContent}
        />
        <VictoryLabel
          textAnchor='middle'
          style={{ fontSize: '25px', fontFamily: 'Montserrat' }}
          x={200}
          y={170}
          text={`${props.labelTitle}`}
        />
      </svg>
      <div className='mt-1 space-y-2'>
        {props?.data.map((datum: any, index: number) => (
          <div key={datum.x} className='flex items-center space-x-2'>
            <div
              className={`h-2 w-2`}
              style={{ background: props?.colorScale[index] }}
            />
            <div className='w-12 text-sxs'>{datum.x}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;

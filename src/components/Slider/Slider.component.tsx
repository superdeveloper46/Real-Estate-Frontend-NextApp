import { Slider } from '@mui/material';
import React from 'react';

type SliderComponentProps = {
  min: number;
  max: number;
  onChangeMin: any;
  onChangeMax: any;
  maxAllowed: number;
};

const SliderComponent = (props: SliderComponentProps) => {
  const handleChange = (e: any, value: any) => {
    props.onChangeMin(value[0]);
    props.onChangeMax(value[1]);
  };

  return (
    <Slider
      valueLabelDisplay='off'
      value={[props.min, props.max ? props.max : props.maxAllowed]}
      step={props.maxAllowed > 10000 ? 1000 : 1}
      min={props.maxAllowed > 10000 ? 0 : props.maxAllowed > 1000 ? 1970 : 1}
      max={props.maxAllowed > 1000 ? props.maxAllowed : 10}
      onChange={handleChange}
    />
  );
};

export default SliderComponent;

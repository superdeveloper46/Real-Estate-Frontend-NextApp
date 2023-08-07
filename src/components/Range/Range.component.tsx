import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    height: 32,
    width: 32,
    backgroundColor: 'transparent',
    '&:before': {
      boxShadow: 'none',
    },
    '&:hover': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-track': {
    background:
      'linear-gradient(90deg, #3263C9 1.8%, #3263C9 58.19%, #1F3559 100.22%)',
    height: 5,
    border: 0,
  },
  '& .MuiSlider-rail': {
    color: 'white',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 5,
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.08)',
    borderRadius: 2,
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <img
        src='/assets/images/listBuilder/range.svg'
        className='mt-1'
        alt='slider-icon'
      />
    </SliderThumb>
  );
}

type RangeProps = {
  value: Array<number>;
  min?: number;
  max?: number;
  onChange?: (value: Array<number>) => void;
};

const Range = (props?: RangeProps) => {
  return (
    <AirbnbSlider
      slots={{ thumb: AirbnbThumbComponent }}
      getAriaLabel={(index) =>
        index === 0 ? 'Minimum price' : 'Maximum price'
      }
      value={props?.value}
      max={props?.max ?? 1000000}
      min={props?.min ?? 0}
      onChange={(e: Event, value: number | Array<number>) => {
        if (props?.onChange) props?.onChange(value as number[]);
      }}
    />
  );
};

export default Range;

import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

type SelectProps = {
  label?: string;
  options: Array<string>;
  value: string | null;
  onChange: (value: any) => void;
};

const randomId = Math.random().toString;

const CommonSelect = (props: SelectProps) => {
  return (
    <>
      <InputLabel variant='standard'>{props.label}</InputLabel>
      <Select
        className='mt-4 w-full rounded-xl bg-gray-200'
        value={props.value || props.options[0]}
        onChange={(e: any) => {
          props.onChange(e.target.value);
        }}
        id={`auto-complete-${randomId}`}
      >
        {props.options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default CommonSelect;

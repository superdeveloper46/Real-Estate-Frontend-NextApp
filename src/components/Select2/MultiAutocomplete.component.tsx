import { MenuItem, Select } from '@mui/material';
import React from 'react';

type AutoCompleteProps = {
  label: string;
  options: Array<string>;
  values: string[];
  onChange: (value: any) => void;
  placeholder?: string;
};

const MultiAutocomplete = (props: AutoCompleteProps) => {
  return (
    <Select
      multiple
      value={props.values || []}
      onChange={(e: any) => {
        props.onChange(e.target.value);
      }}
    >
      {props.options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MultiAutocomplete;

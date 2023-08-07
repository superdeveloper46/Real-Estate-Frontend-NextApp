import React from 'react';

type StatBoxProps = {
  title: string;
  value: string;
};

const StatBox = (props: StatBoxProps) => {
  return (
    <div className='flex w-full flex-col items-center justify-center space-y-2 rounded-md border border-indigo-600 bg-indigo-50 py-4 font-inter font-medium text-indigo-600'>
      <div>{props.title}</div>
      <div className='text-2xl'>{props.value}</div>
    </div>
  );
};

export default StatBox;

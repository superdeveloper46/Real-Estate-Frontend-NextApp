import React from 'react';

type FilterItemProps = {
  children?: React.ReactNode;
};

const FilterItem = (props: FilterItemProps) => {
  return (
    <div>
      <div className='h-full w-80 rounded-xl border bg-sfra-blue-10 py-3 px-4'>
        {props?.children}
      </div>
    </div>
  );
};

export default FilterItem;

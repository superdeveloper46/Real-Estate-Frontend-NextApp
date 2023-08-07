import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../../ListBuilder/Card/HorizontalItem.component';

const Value = () => {
  const { property } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'Estimated Value',
      value: property.currentavmvalue,
    },
    {
      title: 'Equity',
      value: property.equity,
    },
    {
      title: 'Purchase Price',
      value: property.currentsalesprice,
    },
    {
      title: 'Purchase Date',
      value:
        property?.sales_date === 'null'
          ? 'null'
          : format(new Date(property?.sales_date), 'MM/dd/yyyy'),
    },
  ];

  return (
    <div className='m-6 w-80 space-y-3'>
      {sectionData.map((item, index) => (
        <HorizontalItem
          key={index}
          text={item.title}
          value={item.value ?? 'null'}
          // varient='lg'
        />
      ))}
    </div>
  );
};

export default Value;

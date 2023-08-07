import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';
import style from './style.module.scss';

const Last = () => {
  const { property, transaction } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'SALE DATE',
      value:
        property?.sales_date === 'null'
          ? 'null'
          : format(new Date(property?.sales_date), 'MM/dd/yyyy'),
    },
    {
      title: 'SALE AMOUNT',
      value: transaction?.saleamt,
    },
    {
      title: 'RECORDING DATE',
      value: property?.currentsalerecordingdate,
    },
    {
      title: 'DOCUMENT TYPE',
      value: property?.currentsaledocumenttype,
    },
    {
      title: 'DOCUMENT NUMBER',
      value: property?.currentsaledocnbr,
    },
    {
      title: 'BUYER1 NAME',
      value: property?.currentsalebuyer1fullname,
    },
    {
      title: 'BUYER2 NAME',
      value: property?.currentsalebuyer2fullname,
    },
  ];

  return (
    <div className={style.container}>
      {sectionData.map((item, index) => (
        <HorizontalItem
          key={index}
          title={item.title}
          value={item.value ?? 'null'}
        />
      ))}
    </div>
  );
};

export default Last;

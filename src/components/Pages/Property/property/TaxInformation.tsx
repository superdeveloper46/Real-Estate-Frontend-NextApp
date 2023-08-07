import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';
import style from './style.module.scss';

const TaxInformation = () => {
  const { property } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'ASSESSED VALUE',
      value: property?.assdtotalvalue,
    },
    {
      title: 'ASSESSED LAND VALUE',
      value: property?.assdlandvalue,
    },
    {
      title: 'ASSESSED IMPROVEMENTS',
      value: property?.assdimprovementvalue,
    },
    {
      title: 'ANNUAL TAXES',
      value: property?.taxamt,
    },
    {
      title: 'ESTIMATED TAX RATE',
      value: property?.taxratecodearea,
    },
    {
      title: 'YEAR ASSESSED',
      value: property?.assdyear,
    },
    {
      title: 'TAX PAYMENT1 AMOUNT/STATUS',
      value: 'null',
    },
    {
      title: 'TAX PAYMENT2 AMOUNT/STATUS',
      value: 'null',
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

export default TaxInformation;

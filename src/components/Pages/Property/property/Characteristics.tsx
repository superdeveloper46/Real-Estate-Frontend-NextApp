import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';
import style from './style.module.scss';

const Characteristics = () => {
  const { property } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'PROPERTY CLASS',
      value: property?.property_class,
    },
    {
      title: 'PROPERTY TYPE',
      value: property?.property_type,
    },
    {
      title: 'YEAR BUILT',
      value: property?.yearbuilt,
    },
    {
      title: 'SQFT',
      value: property?.sumbuildingsqft,
    },
    {
      title: 'LOT SIZE',
      value: property?.lotsizesqft,
    },
    {
      title: 'BEDS',
      value: property?.bedrooms,
    },
    {
      title: 'BATHS',
      value: property?.property_class,
    },
    {
      title: 'ROOMS',
      value: property?.totalrooms,
    },
    {
      title: 'STORIES',
      value: property?.stories,
    },
  ];

  return (
    <div className={style.container}>
      {sectionData.map((item, index) => (
        <HorizontalItem key={index} title={item.title} value={item.value} />
      ))}
    </div>
  );
};

export default Characteristics;

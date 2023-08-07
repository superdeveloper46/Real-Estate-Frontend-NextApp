import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';
import style from './style.module.scss';

const Location = () => {
  const { property } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'COUNTY',
      value: property?.county,
    },
    {
      title: 'ASSESSOR PRARCEL NUMBER',
      value: 'R10675',
    },
    {
      title: 'LATITUDE/LONGTITUDE',
      value: `${property?.situslatitude} ${property?.situslongitude}`,
    },
    {
      title: 'SUBDIVISION',
      value: property?.subdivisionname,
    },
    {
      title: 'SENSUS TRACT',
      value: property?.situscensustract,
    },
    {
      title: 'CENSUS BLOCK',
      value: property?.situscensusblock,
    },
    {
      title: 'CARRIER ROUTE',
      value: property?.situscarriercode,
    },
    {
      title: 'LEGAL DESCRIPTION',
      value: property?.legaldescription,
    },
    {
      title: 'SCHOOL DISTRICT',
      value: property?.schooldistrictname,
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

export default Location;

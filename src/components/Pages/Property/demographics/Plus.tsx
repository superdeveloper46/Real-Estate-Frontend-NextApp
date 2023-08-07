import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';

const Plus = () => {
  const { ownerDemographics } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'MARRIED',
      value: ownerDemographics.married,
    },
    {
      title: 'LANGUAGE SPOKEN',
      value: ownerDemographics.language,
    },
    {
      title: 'NUMBER OF PEOPLE IN HOUSEHOLD',
      value: ownerDemographics.hhnbr,
    },
    {
      title: 'CHILD PRESENT',
      value: ownerDemographics.child_present,
    },
    {
      title: 'ETHNICITY',
      value: ownerDemographics.likely_ethnicity,
    },
  ];

  return (
    <div className='m-5 space-y-3 p-2'>
      {sectionData.map((item, index) => (
        <HorizontalItem
          key={index}
          title={item.title}
          value={item.value ?? null}
        />
      ))}
    </div>
  );
};

export default Plus;

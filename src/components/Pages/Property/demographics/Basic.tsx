import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';

const BasicSection = () => {
  const { ownerDemographics } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'Name',
      value: ownerDemographics.contact_name,
    },
    {
      title: 'Age',
      value: ownerDemographics.age,
    },
    {
      title: 'Gender',
      value: ownerDemographics.gender,
    },
    {
      title: 'Occupation',
      value: ownerDemographics.occupation,
    },
    {
      icon: '/assets/images/listBuilder/telephone.svg',
      value: ownerDemographics.phoneNumber,
    },
    {
      icon: '/assets/images/listBuilder/email.svg',
      value: ownerDemographics.email,
    },
  ];

  return (
    <div className='m-5 flex space-x-6'>
      <div className='space-y-3 rounded-[10px] border bg-sfra-gray-50 p-3'>
        {sectionData.map((item, index) => (
          <HorizontalItem
            key={index}
            title={item?.title}
            icon={item?.icon}
            value={item.value ?? 'null'}
            valueClass='!text-sfra-blue-100 !font-medium'
          />
        ))}
      </div>
      <div className='space-y-3 rounded-[10px] border bg-sfra-gray-50 p-3'>
        {sectionData.map((item, index) => (
          <HorizontalItem
            key={index}
            title={item?.title}
            icon={item?.icon}
            value={item.value ?? 'null'}
            valueClass='!text-sfra-blue-100 !font-medium'
          />
        ))}
      </div>
    </div>
  );
};

export default BasicSection;

import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';

const Contacts = () => {
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
    <div className='my-8 mx-6 space-y-4'>
      {sectionData.map((item, index) => (
        <HorizontalItem
          key={index}
          title={item?.title}
          icon={item?.icon}
          value={item.value ?? 'null'}
        />
      ))}
    </div>
  );
};

export default Contacts;

import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';

const Premium = () => {
  const { ownerDemographics } = useSelector((state: any) => state.property);

  const sectionData = [
    {
      title: 'SINGLE PARENT',
      value: ownerDemographics.sglparent,
    },
    {
      title: 'ESTIMATED INCOME',
      value: ownerDemographics.estimated_income,
    },
    {
      title: 'ESTIMATED NET WORTH',
      value: ownerDemographics.estimated_net_worth,
    },
    {
      title: 'LIKELY TO HAVE DONE HOME IMPROVEMENT OR HOME REMODELING',
      value: ownerDemographics.home_improvement,
    },
    {
      title: 'CLUSTER',
      value: ownerDemographics.cluster_name,
    },
    {
      title: 'CLUSTER DESCRIPTION',
      value: ownerDemographics.cluster_description,
    },
  ];

  return (
    <div className='m-5 space-y-3'>
      <div className='ml-2 flex items-center space-x-5'>
        <div className='font-montserrat text-sm font-medium text-sfra-pink-300'>
          Upgrade Membership to Unlock Premium Data
        </div>
        <div>
          <img src='/assets/images/property/key.svg' alt='key icon' />
        </div>
      </div>
      <div className='space-y-4 py-2'>
        {sectionData.map((item, index) => (
          <HorizontalItem
            key={index}
            title={item.title}
            value={item.value ?? 'premium information'}
          />
        ))}
      </div>
    </div>
  );
};

export default Premium;

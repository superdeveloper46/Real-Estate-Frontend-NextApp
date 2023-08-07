import React from 'react';

import CommonTab from '@/components/Tab/CommonTab.component';

import Information from './Information';

const Profile = () => {
  const tabs = [
    { title: 'Purchase Information' },
    { title: 'Billing History' },
  ];
  const tabComponents = [<Information key={1} />];
  return (
    <div className='mx-8 py-6'>
      <CommonTab
        tabs={tabs}
        setDefault={0}
        shadow
        childComponents={tabComponents}
      />
    </div>
  );
};

export default Profile;

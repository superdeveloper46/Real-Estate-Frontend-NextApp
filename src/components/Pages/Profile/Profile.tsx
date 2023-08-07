import React from 'react';

import CommonTab from '@/components/Tab/CommonTab.component';

import ChangePass from './ChangePass';
import MyInfo from './MyInfo';

const Profile = () => {
  const tabs = [
    { title: 'My Info' },
    { title: 'Change Password' },
    { title: 'LogIn Hisotry' },
  ];
  const tabComponents = [<MyInfo key={0} />, <ChangePass key={1} />];
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

import React from 'react';

import Demographic from './Demographic';
import Economics from './Economics';
import Families from './Families';
import Housing from './Housing';
import OverView from './OverView';
import Social from './Social';
import styles from './style.module.scss';

const NavContent = () => {
  return (
    <div className={styles.navContent}>
      <div className='mx-6 mt-4 flex rounded-[10px] border'>
        <div className='flex items-center rounded-r-[10px] bg-transparent p-1.5'>
          <img
            src='/assets/images/listBuilder/search.svg'
            alt='search icon'
            className='h-3'
          />
        </div>
        <div className='w-[calc(100%-22px)] rounded-l-[10px]'>
          <input
            type='text'
            placeholder='Find data for this place'
            className='w-full rounded-l-[10px] border-none bg-transparent p-1.5 text-xs font-normal text-sfra-gray-200 outline-none'
          />
        </div>
      </div>
      <div className='relative h-[calc(100vh-105px)] space-y-4 overflow-y-auto px-6 pb-4'>
        <OverView />
        <Demographic />
        <Economics />
        <Families />
        <Housing />
        <Social />
      </div>
    </div>
  );
};

export default NavContent;

import React from 'react';

import styles from './style.module.scss';

const OverViewItem = (props: { title: string; icon: string }) => {
  return (
    <div className='flex items-center space-x-1'>
      <img src={props?.icon} className='h-5' alt={`${props?.title} icon`} />
      <div className='text-sm font-semibold'>{props?.title}</div>
    </div>
  );
};

const OverView = () => {
  return (
    <div className={styles.overView} id='overview'>
      <div className={`${styles.text_title} !border-b-sfra-blue-100/80`}>
        Oakland, CA Livability
      </div>

      <div>
        <OverViewItem
          title='94558'
          icon='/assets/images/market/overView_zip.svg'
        />
        <div>
          <span className='text-sxs text-sfra-gray-200'>
            ZIP Code Tabulation Area in:{' '}
          </span>
          <span className='text-sxs'>
            Napa County, CA, Napa, CA Metro Area, California, United States
          </span>
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='space-y-1.5'>
          <OverViewItem
            title='66,226'
            icon='/assets/images/market/overView_populations.svg'
          />
          <div className='text-sxs text-sfra-gray-200'>
            Number of populations
          </div>
        </div>
        <div className='space-y-1.5'>
          <OverViewItem
            title='66,226'
            icon='/assets/images/market/overView_populations.svg'
          />
          <div className='text-sxs text-sfra-gray-200'>
            Number of populations
          </div>
        </div>
        <div className='space-y-1.5'>
          <OverViewItem
            title='66,226'
            icon='/assets/images/market/overView_populations.svg'
          />
          <div className='text-sxs text-sfra-gray-200'>
            Number of populations
          </div>
        </div>
      </div>

      <div className='text-sxs text-sfra-gray-200'>
        Census data:ACS 2021 5-year unless noted
      </div>
    </div>
  );
};

export default OverView;

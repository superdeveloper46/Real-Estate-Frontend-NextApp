import React from 'react';

import HeaderIcon from '../HeaderIcon';
import styles from '../style.module.scss';
import Table from '../Table.component';

const MarketBuyerTable = (props: { loading: boolean; data: any }) => {
  const header = [
    { title: 'Buyer', sort: true, icon: <HeaderIcon /> },
    { title: 'Purchases', sort: true, icon: <HeaderIcon /> },
  ];

  return (
    <div className={`h-full w-full ${styles.sectionContainer}`}>
      <div className='relative'>
        <Table
          maxHeight='475px'
          header={header}
          body={props?.data}
          loading={props?.loading}
        />
      </div>
    </div>
  );
};

export default MarketBuyerTable;

import React from 'react';

import HeaderIcon from '../HeaderIcon';
import styles from '../style.module.scss';
import Table from '../Table.component';

const ZipBuyerTable = (props: { loading: boolean; data: any }) => {
  const header = [
    { title: 'Buyer Name', sort: true, icon: <HeaderIcon /> },
    { title: 'Number of Properties', sort: true, icon: <HeaderIcon /> },
  ];

  const emptyStateCopy =
    'No data available. Make sure the address radius is located within selected MSA';

  return (
    <div className={`h-full w-full ${styles.sectionContainer}`}>
      <div className='relative'>
        <Table
          maxHeight='325px'
          header={header}
          body={props?.data}
          loading={props?.loading}
          emptyStateCopy={emptyStateCopy}
        />
      </div>
    </div>
  );
};

export default ZipBuyerTable;

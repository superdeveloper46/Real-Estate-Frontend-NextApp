import React from 'react';

import HeaderIcon from '../HeaderIcon';
import styles from '../style.module.scss';
import Table from '../Table.component';

const ZipBuyerDetail = (props: { loading: boolean; data: any }) => {
  const header = [
    { title: 'Recording Date', sort: true, icon: <HeaderIcon />, type: 'date' },
    { title: 'Buyer Name', sort: true, icon: <HeaderIcon /> },
    { title: 'First Mtg Lender Name', sort: true, icon: <HeaderIcon /> },
    { title: 'Buyer Corp Ind', sort: true, icon: <HeaderIcon /> },
    {
      title: 'Buyer Ownership Rights Code',
      sort: true,
      icon: <HeaderIcon />,
    },
    { title: 'Street Address', sort: true, icon: <HeaderIcon /> },
    { title: 'City', sort: true, icon: <HeaderIcon /> },
    { title: 'ZIP code', sort: true, icon: <HeaderIcon /> },
    { title: 'Sum Building Sqft', sort: true, icon: <HeaderIcon /> },
    { title: 'Year Built', sort: true, icon: <HeaderIcon /> },
    { title: 'Current AVM Value', sort: true, icon: <HeaderIcon /> },
    { title: 'Sale Amt', sort: true, icon: <HeaderIcon /> },
    { title: 'Sale Date', sort: true, icon: <HeaderIcon />, type: 'date' },
    { title: 'Seller Name', sort: true, icon: <HeaderIcon /> },
    { title: 'Lender', sort: true, icon: <HeaderIcon /> },
    { title: 'Latitude', sort: true, icon: <HeaderIcon /> },
    { title: 'Longitude', sort: true, icon: <HeaderIcon /> },
    { title: 'Corp Flag', sort: true, icon: <HeaderIcon /> },
    { title: 'Disc Purchase', sort: true, icon: <HeaderIcon /> },
    { title: 'Cash Buyer', sort: true, icon: <HeaderIcon /> },
    { title: 'Private Lender', sort: true, icon: <HeaderIcon /> },
    { title: 'Bedrooms', sort: true, icon: <HeaderIcon /> },
    { title: 'Bathrooms', sort: true, icon: <HeaderIcon /> },
  ];

  const emptyStateCopy =
    'No data available. Make sure the address radius is located within selected MSA';

  return (
    <div className={`h-[300px] w-full ${styles.sectionContainer}`}>
      <div className='relative'>
        <Table
          maxHeight='275px'
          header={header}
          body={props?.data}
          loading={props?.loading}
          defaultSort={{ columnIndex: 0, direction: 'desc' }}
          emptyStateCopy={emptyStateCopy}
        />
      </div>
    </div>
  );
};

export default ZipBuyerDetail;

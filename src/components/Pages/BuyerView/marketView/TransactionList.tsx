import React from 'react';

import HeaderIcon from '../HeaderIcon';
import styles from '../style.module.scss';
import Table from '../Table.component';

const TransactionList = (props: {
  showAddColumn: boolean;
  loading: boolean;
  data: any;
}) => {
  let header = [
    { title: 'Recording Date', sort: true, icon: <HeaderIcon />, type: 'date' },
    { title: 'Buyer Name', sort: true, icon: <HeaderIcon /> },
    { title: 'Loan Amount', sort: true, icon: <HeaderIcon /> },
    { title: 'MSA', sort: true, icon: <HeaderIcon /> },
    { title: 'Address', sort: true, icon: <HeaderIcon /> },
    { title: 'City', sort: true, icon: <HeaderIcon /> },
    { title: 'ZIP code', sort: true, icon: <HeaderIcon /> },
    { title: 'Sqft', sort: true, icon: <HeaderIcon /> },
    { title: 'Year Built', sort: true, icon: <HeaderIcon /> },
    { title: 'Estimated Value', sort: true, icon: <HeaderIcon /> },
    { title: 'Sale Date', sort: true, icon: <HeaderIcon />, type: 'date' },
    { title: 'Sale Amount', sort: true, icon: <HeaderIcon /> },
    { title: 'Seller Mame', sort: true, icon: <HeaderIcon /> },
    { title: 'Bedrooms', sort: true, icon: <HeaderIcon /> },
    { title: 'Bathrooms', sort: true, icon: <HeaderIcon /> },
    { title: 'Property Type', sort: true, icon: <HeaderIcon /> },
    { title: 'Corporate Purchase', sort: true, icon: <HeaderIcon /> },
    { title: 'Discounted Purchase', sort: true, icon: <HeaderIcon /> },
    { title: 'Cash Buyer', sort: true, icon: <HeaderIcon /> },
    { title: 'Private Lender Used', sort: true, icon: <HeaderIcon /> },
    { title: 'Latitude', sort: true, icon: <HeaderIcon /> },
    { title: 'Longitude', sort: true, icon: <HeaderIcon /> },
  ];

  if (props?.showAddColumn) {
    header = [
      ...header,
      { title: 'Phone', sort: true, icon: <HeaderIcon /> },
      { title: 'Email', sort: true, icon: <HeaderIcon /> },
    ];
  }

  return (
    <div className={`h-[500px] w-full ${styles.sectionContainer}`}>
      <div className='relative'>
        <Table
          maxHeight='475px'
          header={header}
          body={props?.data}
          loading={props?.loading}
          defaultSort={{ columnIndex: 0, direction: 'desc' }}
        />
      </div>
    </div>
  );
};

export default TransactionList;

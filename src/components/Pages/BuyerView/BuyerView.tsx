import React from 'react';

import MsaSelect from '@/components/MsaSelect/MsaSelect';

import BuyerDrillView from './BuyerDrillView/BuyerDrillView';
import MarketView from './marketView/MarketView';
import styles from './style.module.scss';
import ZipView from './zipView/ZipView';

const BuyerView = () => {
  return (
    <div className='px-10 py-3'>
      <div className={styles.headerTitle}>Buyer Activity Dashboard</div>
      <MsaSelect />
      <ZipView />
      <MarketView />
      <BuyerDrillView />
    </div>
  );
};

export default BuyerView;

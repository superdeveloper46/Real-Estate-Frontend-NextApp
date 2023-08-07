import { MenuItem } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useGlobalMsa } from '@/core/context/global-msa/globalMsaContext';
import { setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import {
  getBuyers,
  getBuyerTransactionList,
} from '@/utils/api/restful/buyerView';

import type { IBuyerMarketTransactionData, IBuyerViewData } from '../interface';
import Loading from '../Loading.component';
import styles from '../style.module.scss';
import StatsPanel from './StatsPanel';
import TransactionList from './TransactionList';

const BuyerDrillView = () => {
  const [loading, setLoading] = useState(false);
  const [loadingSelectBox, setLoadingSelectBox] = useState(false);
  const [buyers, setBuyers] = React.useState<string[]>([]);
  const [buyer, setBuyer] = React.useState<string | undefined>('');
  const [tableData, setTableData] = React.useState([]);

  const globalMsa = useGlobalMsa();

  useEffect(() => {
    setLoadingSelectBox(true);
    getBuyers({
      msa: globalMsa,
    })
      .then((resData) => {
        const data: string[] = [];
        resData.forEach((el: IBuyerViewData) => {
          data.push(el.BUYER_BORROWER1_NAME);
        });
        setBuyers(data);
        if (data.length > 0) {
          setBuyer(data[0]);
        }
        setLoadingSelectBox(false);
      })
      .catch(() => {
        dispatch(
          setNotification({
            notiType: 'warning',
            notification: `Server error. Can't get Buyers.`,
          })
        );
        setLoadingSelectBox(false);
      });
  }, [globalMsa]);

  useEffect(() => {
    if (buyer === '') return;
    setLoading(true);
    getBuyerTransactionList(String(buyer), globalMsa)
      .then((resData) => {
        const transformedData = resData.map(
          (obj: IBuyerMarketTransactionData) => [
            obj.RECORDING_DATE,
            obj.BUYER_NAME,
            obj.LOAN_AMT,
            obj.MSA,
            obj.ADDRESS,
            obj.CITY,
            obj.ZIP_CODE,
            obj.SQFT,
            obj.YEAR_BUILT,
            obj.ESTIMATED_VALUE,
            obj.SALE_DATE,
            obj.SALE_AMT,
            obj.SELLER_NAME,
            obj.BEDROOMS,
            obj.BATHROOMS,
            obj.PROPERTY_TYPE,
            obj.CORPORATE_PURCHASE,
            obj.DISCOUNTED_PURCHASE,
            obj.CASH_BUYER,
            obj.PRIVATE_LENDER_USED,
            obj.LATITUDE,
            obj.LONGITUDE,
          ]
        );
        setTableData(transformedData);
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          setNotification({
            notiType: 'warning',
            notification: `Server error. Can't get Data.`,
          })
        );
        setLoading(false);
      });
  }, [buyer, globalMsa]);

  return (
    <div className='mt-4 space-y-3'>
      <div className={styles.sectionTitle}>Buyer Drilldown</div>

      <div>
        <div className='flex items-center justify-start space-x-4'>
          <div className={styles.labelText}>Buyer</div>
          <div className='relative flex'>
            <Autocomplete
              sx={{
                display: 'inline-block',
                '& input': {
                  width: 300,
                  border: '1px solid rgb(222 222 220)',
                  borderRadius: '8px',
                  bgcolor: 'background.paper',
                  height: '32px',
                  padding: '0px 8px',
                  outline: 'none',
                  fontSize: '12px',
                },
              }}
              onChange={(_, newValue) => {
                if (newValue) {
                  setBuyer(newValue);
                }
              }}
              options={buyers}
              value={buyer}
              getOptionLabel={(option: any) => option}
              renderOption={(props, option) => {
                return (
                  <MenuItem {...props}>
                    <span className='text-[12px]'>{option}</span>
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type='text' {...params.inputProps} />
                </div>
              )}
            />
            {loadingSelectBox && (
              <div className='absolute top-[18px] w-full'>
                <Loading />
              </div>
            )}
          </div>
          <div
            className={styles.labelText}
          >{`* Select a fund, see their activity (includes all residential home types)`}</div>
        </div>
      </div>

      <div>
        <TransactionList data={tableData} loading={loading} />
      </div>

      <div>
        <StatsPanel data={tableData} loading={loading} />
      </div>
    </div>
  );
};

export default BuyerDrillView;

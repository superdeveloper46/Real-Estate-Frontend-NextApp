import { Autocomplete, MenuItem } from '@mui/material';
import { format, parse } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { TbCheck } from 'react-icons/tb';

import Button from '@/components/Button/Button.component';
import DatepickerComp from '@/components/Datepicker/Datepicker.component';
import { useGlobalMsaContext } from '@/core/context/global-msa/globalMsaContext';
import { usePurchasedMsas } from '@/core/user';
import { setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import {
  getMarketSelectBoxData,
  getMarketTransactionListByCity,
  getMarketTransactionListByMsa,
} from '@/utils/api/restful/buyerView';

import SelectedTab from '../../Billing/Constant/SelectedTab';
import type { IBuyerMarketTransactionData, IBuyerViewData } from '../interface';
import Loading from '../Loading.component';
import styles from '../style.module.scss';
import MarketBuyerTable from './MarketBuyerTable';
import StatsPanel from './StatsPanel';
import TransactionList from './TransactionList';

const MarketView = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(SelectedTab.RecordingDate);
  const tabs = [
    {
      index: SelectedTab.RecordingDate,
      text: 'Recording Date',
    },
    {
      index: SelectedTab.SaleDate,
      text: 'Sale Date',
    },
  ];

  const [selectedData, setSelectedData] = useState<string>('');
  const [selectedDatas, setSelectedDatas] = useState<string[]>([]);
  const [dateMin, setDateMin] = useState(
    format(parse('01/01/2022', 'MM/dd/yyyy', new Date()), 'MM/dd/yyyy')
  );
  const [dateMax, setDateMax] = useState(format(new Date(), 'MM/dd/yyyy'));
  const [loading, setLoading] = useState(false);
  const [loadingSelectBox, setLoadingSelectBox] = useState(false);
  const [data, setData] = useState([]);
  const [buyerData, setBuyerData] = useState([]);

  const accessMsas = usePurchasedMsas();

  const { value, change } = useGlobalMsaContext();

  const handleChange = (event: any, newValue: any) => {
    if (newValue !== null) {
      setSelectedData(newValue);
    }

    if (selectedTab === SelectedTab.SaleDate) {
      change(newValue);
    }
  };

  const getMarketTransactionData = () => {
    if (selectedTab === SelectedTab.RecordingDate) {
      return getMarketTransactionListByCity(
        String(value),
        selectedData,
        dateMin,
        dateMax
      );
    }
    return getMarketTransactionListByMsa(selectedData, dateMin, dateMax);
  };

  useEffect(() => {
    if (!value) {
      return;
    }
    setLoadingSelectBox(true);
    getMarketSelectBoxData({
      selectedTab: selectedTab + '',
      msa: value,
    })
      .then((resData) => {
        setSelectedDatas(resData);
        if (resData.length > 0 && selectedTab === SelectedTab.RecordingDate) {
          setSelectedData(resData[0]);
        } else if (resData.length > 0 && selectedTab === SelectedTab.SaleDate) {
          setSelectedData(value);
        }
        setLoadingSelectBox(false);
      })
      .catch(() => {
        dispatch(
          setNotification({
            notiType: 'warning',
            notification: `Server error. Can't get City.`,
          })
        );
        setLoadingSelectBox(false);
      });
  }, [value, selectedTab]);

  useEffect(() => {
    if (selectedData === '') {
      return;
    }
    setLoading(true);
    getMarketTransactionData()
      .then((resData) => {
        const initialTransactionsData = resData.transactions;
        const transformedTransactionsData = initialTransactionsData.map(
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

        const initialBuyerData = resData.buyers;
        const transformedBuyerData = initialBuyerData.map(
          (obj: IBuyerViewData) => [obj.BUYER_BORROWER1_NAME, obj['COUNT(*)']]
        );

        setData(transformedTransactionsData);
        setBuyerData(transformedBuyerData);
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          setNotification({
            notiType: 'warning',
            notification: `Server error. Can't get SelectBox data.`,
          })
        );
        setLoading(false);
      });
  }, [selectedData, dateMin, dateMax]);

  return (
    <div className='mt-4 space-y-3'>
      <div className={styles.sectionTitle}>Market Overview</div>

      <div className='flex space-x-4'>
        {tabs.map((item, index) => (
          <Button
            key={index}
            text={item.text}
            classes={`${styles.marketTabButton} ${
              selectedTab === item.index
                ? '!bg-sfra-blue-100/20 !text-sfra-blue-100'
                : ''
            }`}
            onClick={() => setSelectedTab(item.index)}
          />
        ))}
      </div>

      <hr />

      <div>
        <div className={styles.subTitle}>
          {selectedTab === SelectedTab.RecordingDate
            ? `Time Analysis Recording Date`
            : `Time Analysis Sale Date`}
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex items-center space-x-4'>
          <div className={styles.labelText}>Date Range</div>
          <DatepickerComp
            value={dateMin === '' ? format(new Date(), 'MM/dd/yyyy') : dateMin}
            setValue={(val) => setDateMin(val)}
          />
          <div>~</div>
          <DatepickerComp
            value={dateMax === '' ? format(new Date(), 'MM/dd/yyyy') : dateMax}
            setValue={(val) => setDateMax(val)}
          />
          <div
            className={styles.labelText}
          >{`* Pick a start and end date to see number of purchases in that time frame`}</div>
        </div>
        <div className='flex items-center justify-start space-x-4'>
          <div className={styles.labelText}>
            {selectedTab === SelectedTab.RecordingDate ? 'City' : 'MSA'}
          </div>
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
              onChange={handleChange}
              options={selectedDatas}
              value={selectedData}
              getOptionLabel={(option: any) => option}
              renderOption={(props, option) => {
                if (accessMsas.indexOf(option) === -1) {
                  return (
                    <MenuItem {...props} sx={{ fontSize: '12px' }}>
                      {option}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem {...props} sx={{ fontSize: '12px', width: 300 }}>
                    <div className='flex w-full items-center justify-between'>
                      <div className='w-4/5 font-semibold text-sfra-pink-100'>
                        {option}
                      </div>
                      <div className='flex w-1/5 justify-end'>
                        <TbCheck
                          size={18}
                          className='font-semibold text-sfra-pink-100'
                        />
                      </div>
                    </div>
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
          <div className={styles.labelText}>{`* Pick a ${
            selectedTab === SelectedTab.RecordingDate ? 'City' : 'MSA'
          }`}</div>

          {accessMsas.indexOf(selectedData) === -1 &&
            selectedTab === SelectedTab.SaleDate &&
            !loadingSelectBox && (
              <div>
                <div className='whitespace-nowrap font-montserrat text-xs text-black underline'>
                  {`Viewing free-tier of selected MSA with delayed data by 12 months. To get real-time data and buyer contact information, please upgrade your plan.`}
                </div>
                <div>
                  <Button
                    text='Subscribe'
                    classes={'!bg-sfra-pink-100 !h-7 !rounded-full'}
                    onClick={() => {
                      router.push({
                        pathname: '/billing/stripe-plan',
                        query: { text: selectedData, value: selectedData },
                      });
                    }}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

      <div className='!mt-5 flex space-x-3'>
        <div className='w-1/2'>
          <MarketBuyerTable loading={loading} data={buyerData} />
        </div>
        <div className='relative w-1/2'>
          <StatsPanel data={data} loading={loading} />
        </div>
      </div>

      <div>
        <div className={styles.subTitle}>TransactionList</div>
      </div>

      <div>
        <TransactionList
          showAddColumn={
            selectedTab === SelectedTab.RecordingDate
              ? false
              : accessMsas.indexOf(selectedData) !== -1
          }
          loading={loading}
          data={data}
        />
      </div>
    </div>
  );
};

export default MarketView;

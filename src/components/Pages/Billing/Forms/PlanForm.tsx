import { Autocomplete, MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import { checkoutSubscription } from '@/utils/api/restful/billing';
import { getMarketSelectBoxData } from '@/utils/api/restful/buyerView';

import Loading from '../../BuyerView/Loading.component';
import type {
  ICheckoutSubscriptionRequest,
  ICheckoutSubscriptionResponse,
} from '../interface';
import YearlyTextField from '../TextField';

const PlanForm = () => {
  const router = useRouter();
  const { query } = router;
  const [loadingSelectBox, setLoadingSelectBox] = useState(false);
  const [msaData, setMsaData] = useState([{ text: '', value: '' }]);
  const [selectedMsas, setSelectedMsas] = useState([{}]);

  const unit = 1250;

  useEffect(() => {
    const billingPlanData = localStorage.getItem('billingPlan');
    if (!billingPlanData) {
      setSelectedMsas([query]);
    } else {
      const tempMsas: string = JSON.parse(billingPlanData ?? '').msas;
      if (tempMsas === '') {
        setSelectedMsas([query]);
        return;
      }
      const tempMsasArray = tempMsas.split(':::');
      const tempSelectedMsas: any = [];
      tempMsasArray.forEach((el) => {
        if (el !== '') {
          tempSelectedMsas.push({ text: el, value: el });
        }
      });
      setSelectedMsas(tempSelectedMsas);
    }
  }, [query]);

  useEffect(() => {
    setLoadingSelectBox(true);
    getMarketSelectBoxData({ selectedTab: '1', msa: null })
      .then((resData) => {
        const tmpData: any = [];
        resData.forEach((el: any) => {
          const temp: any = {
            text: el,
            value: el,
          };
          tmpData.push(temp);
        });

        setMsaData(tmpData);
        setLoadingSelectBox(false);
      })
      .catch(() => {
        dispatch(
          setNotification({
            notiType: 'warning',
            notification: `Sever error. Can't get City.`,
          })
        );
        setLoadingSelectBox(false);
      });
  }, []);

  const handleChange = (event: any, newValue: any) => {
    setSelectedMsas(newValue);
  };

  const generateCheckoutUrl = async () => {
    const msasPayload: string[] = [];
    selectedMsas.forEach((selectedMsa: any) => {
      msasPayload.push(selectedMsa.value);
    });

    const requestPayload: ICheckoutSubscriptionRequest = {
      msas: msasPayload,
    };

    const resp: ICheckoutSubscriptionResponse = await checkoutSubscription(
      requestPayload
    );

    window.location.href = resp.url;
  };

  return (
    <div className='mx-auto my-10 h-full w-[660px] space-y-12 rounded-md bg-gray-200 text-sfra-gray-400'>
      <div className='space-y-4'>
        <div className='text-3xl font-medium'>Paid Plan</div>
        <div className='text-sfra-gray-300'>
          Purchase access for real-time data and contact information.
        </div>
      </div>

      <div className='rounded-lg'>
        <YearlyTextField
          label='Yearly'
          value={`${
            selectedMsas.length === 0
              ? 0
              : (unit * (selectedMsas.length + 1) + '').replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ','
                )
          } USD`}
          style='mb-3 bg-gray-100'
          textColor='text-[#3263C9]'
        />
      </div>

      <div className='space-y-2'>
        <div className='text-sm font-semibold'>* Please select Msas</div>
        <div className='relative flex'>
          <Autocomplete
            sx={{ width: '100%' }}
            multiple
            onChange={handleChange}
            options={msaData}
            value={selectedMsas}
            getOptionLabel={(option: any) => option.text}
            renderOption={(renderProps, option: any) => (
              <MenuItem {...renderProps} sx={{ fontSize: '12px' }}>
                {option.text}
              </MenuItem>
            )}
            renderInput={(params) => (
              <TextField {...params} label='MSA' variant='standard' />
            )}
          />
          {loadingSelectBox && (
            <div className='absolute top-[18px] w-full'>
              <Loading />
            </div>
          )}
        </div>
      </div>

      <button
        type='button'
        className='billing-pay-button'
        onClick={() => {
          generateCheckoutUrl();
        }}
      >
        Buy Access
      </button>
    </div>
  );
};

export default PlanForm;

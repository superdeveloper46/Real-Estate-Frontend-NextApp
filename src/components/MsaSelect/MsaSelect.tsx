import { TextField } from '@material-ui/core';
import { Autocomplete, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TbCheck } from 'react-icons/tb';

import Button from '@/components/Button/Button.component';
import Loading from '@/components/Pages/BuyerView/Loading.component';
import { useGlobalMsaContext } from '@/core/context/global-msa/globalMsaContext';
import { usePurchasedMsas } from '@/core/user';
import { setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import { getMarketSelectBoxData } from '@/utils/api/restful/buyerView';

import styles from '../Pages/BuyerView/style.module.scss';

const MsaSelect = () => {
  const router = useRouter();

  const { value, change } = useGlobalMsaContext();

  const [isLoading, setIsLoading] = useState(true);
  const [msasOptions, setMsasOptions] = useState<string[]>([]);
  const accessibleMsas = usePurchasedMsas();

  useEffect(() => {
    const loadData = async () => {
      try {
        const allMsas = await getMarketSelectBoxData({
          selectedTab: '1',
          msa: null,
        });
        setMsasOptions(allMsas);
        setIsLoading(false);
      } catch {
        dispatch(
          setNotification({
            notiType: 'warning',
            notification: 'Failed to load MSAs',
          })
        );
      }
    };

    loadData();
  }, []);

  return (
    <div className='mb-4 flex items-center gap-4'>
      <p className={`${styles.labelText} !w-[unset]`}>Pick a global MSA</p>
      <Autocomplete
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 300,
          border: '1px solid rgb(222 222 220)',
          borderRadius: '8px',
          bgcolor: 'background.paper',
          height: '32px',
          padding: '0px 8px',
          outline: 'none',

          '& input': {
            fontSize: '12px',
          },

          '& div::before, & div::after': {
            display: 'none',
          },
        }}
        onChange={(_, newMsa) => change(newMsa)}
        disableClearable
        options={msasOptions}
        value={value ?? ''}
        getOptionLabel={(option: any) => option}
        renderOption={(props, option) => {
          if (accessibleMsas.indexOf(option) === -1) {
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
        renderInput={(params) => <TextField {...params} />}
      />
      {isLoading && (
        <div className='absolute top-[18px] w-full'>
          <Loading />
        </div>
      )}
      {value && accessibleMsas.indexOf(value) === -1 && !isLoading && (
        <div>
          <div className='whitespace-nowrap font-montserrat text-xs text-black underline'>
            Viewing free-tier of selected MSA with delayed data by 12 months. To
            get real-time data and buyer contact information, please upgrade
            your plan.
          </div>
          <div>
            <Button
              text='Subscribe'
              classes={'!bg-sfra-pink-100 !h-7 !rounded-full'}
              onClick={() => {
                router.push({
                  pathname: '/billing/stripe-plan',
                  query: { text: value, value },
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MsaSelect;

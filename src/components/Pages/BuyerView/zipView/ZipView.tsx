import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import GeocodeService from '@mapbox/mapbox-sdk/services/geocoding';
import { MenuItem, TextField } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import getDistance from '@turf/distance';
import { format, parse } from 'date-fns';
import { debounce, max, min } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

import DatepickerComp from '@/components/Datepicker/Datepicker.component';
import Range from '@/components/Range/Range.component';
import { useGlobalMsa } from '@/core/context/global-msa/globalMsaContext';
import { setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import { getZipBuyerData, getZipList } from '@/utils/api/restful/buyerView';

import type { IBuyerViewData, IBuyerViewDetailData } from '../interface';
import Loading from '../Loading.component';
import styles from '../style.module.scss';
import StatsPanel from './StatsPanel';
import ZipBuyerDetail from './ZipBuyerDetail';
import ZipBuyerTable from './ZipBuyerTable';

const ZipView = () => {
  const [zip, setZip] = useState<string[]>([]);
  const [zipList, setZipList] = useState<string[]>([]);
  const [loadingRetrieveZipList, setLoadingRetrieveZipList] =
    useState<Boolean>(false);
  const [locations, setLocations] = useState<GeocodeFeature[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodeFeature | null>(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [salesPriceMin, setSalesPriceMin] = useState(1);
  const [salesPriceMax, setSalesPriceMax] = useState(1000000);
  const [saleDateMin, setSaleDateMin] = useState(
    format(parse('01/01/2022', 'MM/dd/yyyy', new Date()), 'MM/dd/yyyy')
  );
  const [saleDateMax, setSaleDateMax] = useState(
    format(new Date(), 'MM/dd/yyyy')
  );
  const [bedsMin, setBedsMin] = useState(1);
  const [bedsMax, setBedsMax] = useState(4);
  const [bathsMin, setBathsMin] = useState(1);
  const [bathsMax, setBathsMax] = useState(4);

  const [loading, setLoading] = useState(false);
  const [data, setDetailData] = useState<unknown[][]>([]);
  const [countData, setCountData] = useState<unknown[][]>([]);

  const globalMsa = useGlobalMsa();

  const loadDataByZip = () =>
    getZipBuyerData({
      zip,
      salesPriceMin,
      salesPriceMax,
      saleDateMin,
      saleDateMax,
      bedsMin,
      bedsMax,
      bathsMin,
      bathsMax,
      msa: globalMsa,
    });

  const handleLoadLocations = useMemo(
    () =>
      debounce(async (address: string) => {
        const geoService = GeocodeService({
          accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!,
        });
        const {
          body: { features },
        } = await geoService
          .forwardGeocode({ query: address, countries: ['US'] })
          .send();
        setLocations(features);
      }, 500),
    []
  );

  const loadDataByAddress = async () => {
    if (!selectedLocation || searchRadius === 0) {
      return { counts: [], buyers: [] };
    }

    return getZipBuyerData({
      coordinates: {
        lat: selectedLocation.center[1],
        lon: selectedLocation.center[0],
      },
      searchRadius,
      salesPriceMin,
      salesPriceMax,
      saleDateMin,
      saleDateMax,
      bedsMin,
      bedsMax,
      bathsMin,
      bathsMax,
      msa: globalMsa,
    });
  };

  const retrieveData = async () => {
    let resp;
    if (zip.length > 0) {
      resp = await loadDataByZip();
    } else {
      resp = await loadDataByAddress();
    }

    const buyerDetailData = resp.buyers;
    const transformedBuyerDetailData = buyerDetailData.map(
      (obj: IBuyerViewDetailData) => [
        obj.RECORDING_DATE,
        obj.BUYER_BORROWER1_NAME,
        obj.FIRST_MTG_LENDER_NAME,
        obj.BUYER_BORROWER1_CORP_IND,
        obj.BUYER_BORROWER1_OWNERSHIP_RIGHTS_CODE,
        obj.FULL_STREET_ADDRESS,
        obj.CITY,
        obj.ZIP_CODE,
        obj.SUM_BUILDING_SQFT,
        obj.YEAR_BUILT,
        obj.CURRENT_AVM_VALUE,
        obj.SALE_AMT,
        obj.SALE_DATE,
        obj.SELLER1_NAME,
        obj.LENDER,
        obj.LATITUDE,
        obj.LONGITUDE,
        obj.CORP_FLAG,
        obj.DISC_PURCHASE,
        obj.CASH_BUYER,
        obj.PRIVATE_LENDER,
        obj.BEDROOMS,
        obj.BATHROOMS,
      ]
    );

    const buyerCountData = resp.counts;
    const transformedBuyerCountData = buyerCountData.map(
      (obj: IBuyerViewData) => [obj.BUYER_BORROWER1_NAME, obj['COUNT(*)']]
    );

    return {
      buyerDetail: transformedBuyerDetailData,
      buyerCount: transformedBuyerCountData,
    };
  };

  const debouncedRetrieveData = debounce(() => {
    setLoading(true);

    retrieveData()
      .then((resData) => {
        setDetailData(resData.buyerDetail);
        setCountData(resData.buyerCount);
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
  }, 500);

  useEffect(() => {
    setLoadingRetrieveZipList(true);
    getZipList(globalMsa)
      .then((resData) => {
        setZipList(resData);
        if (resData.length > 0) {
          const defaultZip = resData.includes('90044')
            ? ['90044']
            : [resData[0]];
          setZip(defaultZip);
          setLocations([]);
          setSelectedLocation(null);
          setSearchRadius(5);
        }
        setLoadingRetrieveZipList(false);
      })
      .catch(() => {
        dispatch(
          setNotification({
            notiType: 'warning',
            notification: `Server error. Can't get Data.`,
          })
        );
        setLoadingRetrieveZipList(false);
      });
  }, [globalMsa]);

  useEffect(() => {
    if (zip.length === 0 && !selectedLocation) {
      setDetailData([]);
      return;
    }

    debouncedRetrieveData();
  }, [
    zip,
    searchRadius,
    selectedLocation,
    salesPriceMin,
    salesPriceMax,
    saleDateMin,
    saleDateMax,
    bedsMin,
    bedsMax,
    bathsMin,
    bathsMax,
  ]);

  const zipCoordinates = useMemo(() => {
    if (zip.length === 0) {
      return null;
    }

    const getCenter = (index: number) => {
      const minValue = min(data.map((d) => d[index]));
      const maxValue = max(data.map((d) => d[index]));

      return minValue != null && maxValue != null
        ? (Number(minValue) + Number(maxValue)) / 2
        : null;
    };

    return data.length > 0
      ? {
          lat: getCenter(15)!,
          lon: getCenter(16)!,
        }
      : null;
  }, [zip, data]);
  const dataWithinRadius = useMemo(() => {
    if (!zipCoordinates || !searchRadius) {
      return data;
    }

    return data.filter(
      (d) =>
        getDistance(
          [zipCoordinates.lon, zipCoordinates.lat],
          [Number(d[16]), Number(d[15])],
          {
            units: 'miles',
          }
        ) <= searchRadius
    );
  }, [data, zipCoordinates, searchRadius]);

  return (
    <div className='space-y-3'>
      <div className='flex items-center space-x-5'>
        <div className='flex items-center space-x-5'>
          <div className={styles.labelText}>Zip</div>
          <div className='relative w-full'>
            <Autocomplete
              sx={{ width: '100%' }}
              multiple
              onChange={(event, newValue) => {
                setZip(newValue);
                setLocations([]);
                setSelectedLocation(null);
                setSearchRadius(5);
              }}
              options={zipList}
              value={zip}
              getOptionLabel={(option: any) => option}
              renderOption={(renderProps, option: any) => (
                <MenuItem {...renderProps}>{option}</MenuItem>
              )}
              renderInput={(params) => <TextField {...params} />}
            />
            {loadingRetrieveZipList && (
              <div className='absolute top-[18px] w-full'>
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
      <p className='font-bold'>OR</p>
      <div className='flex items-center space-x-5'>
        <div className='flex items-center space-x-5'>
          <div className={styles.labelText} style={{ width: 'unset ' }}>
            Address
          </div>
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
            onInputChange={(event, newInputValue) => {
              handleLoadLocations(newInputValue);
            }}
            onChange={(_, newValue: GeocodeFeature | null) => {
              setSelectedLocation(newValue);
              setZip([]);
            }}
            getOptionLabel={(o) => o.place_name}
            options={locations}
            value={selectedLocation}
            renderOption={(props, option) => (
              <li {...props}>
                <Grid container alignItems='center'>
                  <Grid item sx={{ display: 'flex', width: 44 }}>
                    <LocationOnIcon sx={{ color: 'text.secondary' }} />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      width: 'calc(100% - 44px)',
                      wordWrap: 'break-word',
                    }}
                  >
                    <Box component='span'>{option.place_name}</Box>
                  </Grid>
                </Grid>
              </li>
            )}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  type='text'
                  {...params.inputProps}
                  autoComplete='new-password'
                />
              </div>
            )}
          />
        </div>
        <div className={styles.labelText}>Search radius</div>
        <select
          className='h-10 w-full max-w-[100px] rounded-md border px-1 text-ms outline-none'
          value={searchRadius.toString()}
          onChange={(e) => setSearchRadius(Number(e.target.value))}
        >
          <option value='0'>N/A</option>
          <option value='1'>1mi</option>
          <option value='2'>2mi</option>
          <option value='5'>5mi</option>
          <option value='10'>10mi</option>
        </select>
      </div>
      <p className={styles.labelText}>
        Use these filters to narrow down purchase activity for property
        investors.
      </p>
      <div className='flex justify-between'>
        <div className='flex w-1/6 items-center space-x-5'>
          <div className={styles.labelText}>Sales Price</div>
          <div className='w-full'>
            <div className='w-full'>
              <Range
                value={[salesPriceMin, salesPriceMax]}
                max={5000000}
                onChange={(value: Array<number>) => {
                  setSalesPriceMin(value[0] ?? 1);
                  setSalesPriceMax(value[1] ?? 1);
                }}
              />
            </div>
            <div className={styles.rangeBottomText}>
              ${salesPriceMin.toLocaleString('en-US')}- $
              {salesPriceMax.toLocaleString('en-US')}
            </div>
          </div>
        </div>
        <div className='flex w-2/6 items-center space-x-5'>
          <div className={styles.labelText}>Sale Date</div>
          <DatepickerComp
            value={
              saleDateMin === ''
                ? format(new Date(), 'MM/dd/yyyy')
                : saleDateMin
            }
            setValue={(value) => setSaleDateMin(value)}
          />
          <div>{' – '}</div>
          <DatepickerComp
            value={
              saleDateMax === ''
                ? format(new Date(), 'MM/dd/yyyy')
                : saleDateMax
            }
            setValue={(value) => setSaleDateMax(value)}
          />
        </div>
        <div className='flex w-1/6 items-center space-x-5'>
          <div className={styles.labelText}>Beds</div>
          <div className='w-full'>
            <div className='w-full'>
              <Range
                value={[bedsMin, bedsMax]}
                max={10}
                onChange={(value: Array<number>) => {
                  setBedsMin(value[0] ?? 1);
                  setBedsMax(value[1] ?? 1);
                }}
              />
            </div>
            <div className={styles.rangeBottomText}>
              {bedsMin}-{bedsMax}
            </div>
          </div>
        </div>
        <div className='flex w-1/6 items-center space-x-5'>
          <div className={styles.labelText}>Baths</div>
          <div className='w-full'>
            <div className='w-full'>
              <Range
                value={[bathsMin, bathsMax]}
                max={10}
                onChange={(value: Array<number>) => {
                  setBathsMin(value[0] ?? 1);
                  setBathsMax(value[1] ?? 1);
                }}
              />
            </div>
            <div className={styles.rangeBottomText}>
              {bathsMin}-{bathsMax}
            </div>
          </div>
        </div>
      </div>
      <div className='!mt-6 flex space-x-3'>
        <div className='relative w-1/2'>
          <StatsPanel data={dataWithinRadius} loading={loading} />
        </div>
        <div className='w-1/2'>
          <ZipBuyerTable loading={loading} data={countData} />
        </div>
      </div>
      <div className='w-full'>
        <ZipBuyerDetail loading={loading} data={dataWithinRadius} />
      </div>
    </div>
  );
};

export default ZipView;

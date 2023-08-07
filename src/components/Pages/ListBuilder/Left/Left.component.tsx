import React from 'react';

import Button from '@/components/Button/Button.component';
import ImageIcon from '@/components/ImageIcon/ImageIcon';
import OwnerInfoDemographicsPanel from '@/components/Pages/ListBuilder/FilterPanels/OwnerInfoDemographics.panel';
import { setToggleFilters } from '@/redux/slices/listBuilder';

import { dispatch, useSelector } from '../../../../redux/store';
import LocationPanel from '../FilterPanels/Location.panel';
import MLSStatusPanel from '../FilterPanels/MLSStatus.panels';
import MortgageInfoPanel from '../FilterPanels/MortgageInfo.panel';
import PreForclosureREPsPanel from '../FilterPanels/PreForclosureREPs.panel';
import PropertyCharacteristicsPanel from '../FilterPanels/PropertyCharacteristics.panel';
import ValuationEquityInfoPanel from '../FilterPanels/ValuationEquityInfo.panel';
import LeftItem from './LeftItem.component';

const Left = () => {
  const { realFilters } = useSelector((state: any) => state.listBuilder);
  const filterList = [
    {
      title: 'Location',
      icon: '/assets/images/listBuilder/location.svg',
      filterCount: realFilters.locationFilters?.filterCount ?? '',
      dialog: <LocationPanel />,
    },
    {
      title: 'Property Characteristics',
      icon: '/assets/images/listBuilder/property.svg',
      filterCount: realFilters.propertyCharcFilters?.filterCount ?? '',
      dialog: <PropertyCharacteristicsPanel />,
    },
    {
      title: 'Owner Info & Demographics',
      icon: '/assets/images/listBuilder/owner.svg',
      filterCount: realFilters.ownerInfoDgFilters?.filterCount ?? '',
      dialog: <OwnerInfoDemographicsPanel />,
    },
    {
      title: 'Valuation & Equity Info',
      icon: '/assets/images/listBuilder/valuation.svg',
      filterCount: realFilters.valuationEquityInfoFilters?.filterCount ?? '',
      dialog: <ValuationEquityInfoPanel />,
    },
    {
      title: 'Pre-Foreclosure & REPs',
      icon: '/assets/images/listBuilder/foreclosure.svg',
      filterCount: realFilters.preForeclosureRepsFilters?.filterCount ?? '',
      dialog: <PreForclosureREPsPanel />,
    },
    {
      title: 'MLS Status',
      icon: '/assets/images/listBuilder/mls.svg',
      filterCount: realFilters.mlsStatusFilters?.filterCount ?? '',
      dialog: <MLSStatusPanel />,
    },
    {
      title: 'Mortgage Info',
      icon: '/assets/images/listBuilder/mortgage.svg',
      filterCount: realFilters.mortgageInfoFilters?.filterCount ?? '',
      dialog: <MortgageInfoPanel />,
    },
    {
      title: 'Pre-Built Lists',
      icon: '/assets/images/listBuilder/built-list.svg',
    },
  ];

  const { toggleFilters } = useSelector((state: any) => state.listBuilder);
  const show = (): void => {
    dispatch(setToggleFilters());
  };
  const visibleClass = toggleFilters ? 'w-72' : 'w-[65px]';

  return (
    <div
      className={`flex-none cursor-pointer shadow-md shadow-gray-400 ${visibleClass}`}
      style={{
        transition: 'width 0.5s ease',
      }}
    >
      <div className='group flex items-center justify-between border-b py-3 px-2 shadow-sm shadow-gray-300 hover:bg-sfra-blue-100'>
        <div
          className='flex items-center justify-center space-x-3 px-3'
          onClick={() => show()}
        >
          <ImageIcon
            src='/assets/images/listBuilder/filter-left.svg'
            alt='filter left icon'
            classes='!h-5'
            varient='white'
          />
          {toggleFilters && (
            <div className='whitespace-nowrap font-montserrat text-ms font-semibold text-sfra-gray-300 group-hover:text-white'>
              Filter your list
            </div>
          )}
        </div>
        {toggleFilters && (
          <div onClick={() => show()}>
            <ImageIcon
              src='/assets/images/listBuilder/filter-right.svg'
              alt='filter right icon'
              classes='mr-3 !h-5'
              varient='white'
            />
          </div>
        )}
      </div>

      <div>
        {filterList.map((item, index) => (
          <LeftItem
            key={`filterList-${index}`}
            open={index}
            title={item?.title}
            icon={item?.icon}
            filterCount={item?.filterCount}
            contentVisible={toggleFilters}
          >
            {item?.dialog}
          </LeftItem>
        ))}
      </div>

      {toggleFilters && (
        <div className='m-4'>
          <div className='flex w-full flex-col items-center justify-center rounded-xl bg-sfra-pink-50 py-3 hover:fill-slate-900'>
            <img
              src='/assets/images/listBuilder/list-builder-bottom.svg'
              className='h-36'
              alt='list builder bottom image'
            />
            <Button
              text='Upgrade to Professional'
              variant='filled'
              classes='mt-4 bg-sfra-pink-100 w-48 hover:bg-sfra-pink-200'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Left;

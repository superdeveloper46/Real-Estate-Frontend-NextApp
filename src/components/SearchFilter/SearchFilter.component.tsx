import React from 'react';

import {
  clearAllFilterLists as clearAll,
  clearFilterList as clear,
  setOpenFilterDialog,
} from '../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../redux/store';

const SearchFilter = () => {
  const { filterLists } = useSelector((state: any) => state.listBuilder);

  const clearAllFilterLists = () => {
    dispatch(clearAll());
  };

  const clearFilterList = (dataId: string, key: string) => {
    const data: any = {
      dataId,
      key,
    };
    dispatch(clear(data));
  };

  const filters = [
    'locationFilters',
    'propertyCharcFilters',
    'ownerInfoDgFilters',
    'valuationEquityInfoFilters',
    'preForeclosureRepsFilters',
    'mlsStatusFilters',
    'mortgageInfoFilters',
    'preBuiltFilters',
  ];

  return (
    <div className='relative flex space-x-2'>
      <div className='h-full max-h-[88px] min-h-[36px] w-[calc(100%-2.8rem)] items-center overflow-y-auto overflow-x-hidden rounded-xl bg-sfra-gray-50 px-1.5 pt-1.5'>
        {filterLists.map((item: any, index: number) => (
          <div
            key={index}
            className='group float-left mr-1.5 mb-1.5 flex h-6 cursor-pointer items-center justify-between rounded-lg bg-white px-1.5'
          >
            <div
              className='whitespace-nowrap pr-2 font-montserrat text-xs font-normal text-sfra-gray-200 group-hover:text-sfra-blue-100'
              onClick={() => {
                dispatch(
                  setOpenFilterDialog(filters.indexOf(item.dataId) as any)
                );
              }}
            >
              {item?.key} : {item?.value}
            </div>
            <div
              className='mt-[-6px] cursor-pointer text-xl text-sfra-blue-50 group-hover:text-sfra-blue-100'
              onClick={() => clearFilterList(item.dataId, item.key)}
            >
              ×
            </div>
          </div>
        ))}
      </div>
      <div className='right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-sfra-blue-50 hover:bg-sfra-blue-100'>
        <div
          className='mt-[-6px] text-3xl text-white'
          onClick={clearAllFilterLists}
        >
          ×
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;

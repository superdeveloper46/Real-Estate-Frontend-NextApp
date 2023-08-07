import { format } from 'date-fns';
import React from 'react';

import CheckInput from '@/components/CheckInput/CheckInput.component';
import DatepickerComp from '@/components/Datepicker/Datepicker.component';
import Dropdown from '@/components/Dropdown/Dropdown.component';
import NumberInput from '@/components/NumberInput/NumberInput.component';
import RadioInput from '@/components/RadioInput/RadioInput.component';
import Range from '@/components/Range/Range.component';

import { setData } from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import FilterItem from './FilterItem.component';
import style from './style.module.scss';

const OwnerInfoDemographicsPanel = () => {
  const dataId: string = 'ownerInfoDgFilters';

  const { filters }: any = useSelector((state: any) => state.listBuilder);
  const { ownerInfoDgFilters } = filters;

  const update = (key: string, value: any) => {
    const data: any = {
      dataId,
      key,
      value,
    };
    dispatch(setData(data));
  };

  const ownerType = [
    'Any',
    'Life Tenant',
    'Individual',
    'Company or Corporation',
    'Husband and Wife',
    'Unmarried Woman',
    'Family Trust',
    'Trustee, or Conservator',
    'Limited Partner',
    'Life Tenant (holds a life estate interest only)',
    'T',
  ];

  return (
    <div className='flex space-x-6'>
      <FilterItem>
        <div className={style.textLg}>Years Owned</div>
        <div className='my-3  flex items-center'>
          <div className='flex justify-between space-x-3'>
            <div className='w-1/2'>
              <div className={style.textSm}>min</div>
              <NumberInput
                value={ownerInfoDgFilters.yearsOwnedMin}
                onChange={(value) => {
                  update('yearsOwnedMin', value);
                }}
              />
            </div>
            <div className='w-1/2'>
              <div className={style.textSm}>max</div>
              <NumberInput
                value={ownerInfoDgFilters.yearsOwnedMax}
                onChange={(value) => {
                  update('yearsOwnedMax', value);
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <CheckInput
            label={'Include properties with no known last sale date'}
            color='green'
            checked={ownerInfoDgFilters.yearsOwnedInclude}
            onClick={() => {
              update(
                'yearsOwnedInclude',
                !ownerInfoDgFilters.yearsOwnedInclude
              );
            }}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Owner Type</div>
        <div className='mt-2'>
          <Dropdown
            options={ownerType}
            values={[''].concat(ownerType.slice(1))}
            selectedValue={ownerInfoDgFilters.ownerType}
            onClick={(value) => update('ownerType', value)}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Last Sale Date</div>
        <div className='my-3 flex space-x-3'>
          <div className='w-1/2'>
            <div className={style.textSm}>min date</div>
            <DatepickerComp
              value={
                ownerInfoDgFilters.lastSaleDateStart === ''
                  ? format(new Date(), 'MM/dd/yyyy')
                  : ownerInfoDgFilters.lastSaleDateStart
              }
              setValue={(value) => update('lastSaleDateStart', value)}
            />
          </div>
          <div className='w-1/2'>
            <div className={style.textSm}>max date</div>
            <DatepickerComp
              value={
                ownerInfoDgFilters.lastSaleDateEnd === ''
                  ? format(new Date(), 'MM/dd/yyyy')
                  : ownerInfoDgFilters.lastSaleDateEnd
              }
              setValue={(value) => update('lastSaleDateEnd', value)}
            />
          </div>
        </div>

        <div className='flex items-center'>
          <CheckInput
            label={'Include properties with no known last sale date'}
            color='green'
            checked={ownerInfoDgFilters.lastSaleDateInclude}
            onClick={() => {
              update(
                'lastSaleDateInclude',
                !ownerInfoDgFilters.lastSaleDateInclude
              );
            }}
          />
        </div>
      </FilterItem>

      <FilterItem>
        <div className={style.textLg}>Last Sale Price</div>
        <div className={style.priceInput + ' flex justify-between my-2'}>
          <input
            type='number'
            value={ownerInfoDgFilters.lastSalePriceMin}
            onChange={(e) => {
              update('lastSalePriceMin', Number(e.target.value) + '');
            }}
          />
          <input
            type='number'
            value={ownerInfoDgFilters.lastSalePriceMax}
            onChange={(e) =>
              update('lastSalePriceMax', Number(e.target.value) + '')
            }
          />
        </div>
        <Range
          value={[
            ownerInfoDgFilters.lastSalePriceMin,
            ownerInfoDgFilters.lastSalePriceMax,
          ]}
          onChange={(value: Array<number>) => {
            update('lastSalePriceMin', value[0] ?? 0);
            update('lastSalePriceMax', value[1] ?? 0);
          }}
        />
        <div className='-mt-2 mb-2 flex justify-between space-x-3'>
          <div className={style.textSm}>min</div>
          <div className={style.textSm}>max</div>
        </div>
        <div className='flex items-center'>
          <CheckInput
            label={'Include properties with no known last sale date'}
            checked={ownerInfoDgFilters.lastSalePriceInclude}
            onClick={() => {
              update(
                'lastSalePriceInclude',
                !ownerInfoDgFilters.lastSalePriceInclude
              );
            }}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Owner Occupied</div>
        <div className='mt-2 space-y-3 pl-1'>
          <RadioInput
            label='Owner Occupied'
            checked={ownerInfoDgFilters.ownerOccupied === 'Y'}
            onClick={() => update('ownerOccupied', 'Y')}
          />
          <RadioInput
            label='Non Owner Occupied'
            checked={ownerInfoDgFilters.ownerOccupied === 'N'}
            onClick={() => update('ownerOccupied', 'N')}
          />
          <RadioInput
            label='Any'
            checked={ownerInfoDgFilters.ownerOccupied === ''}
            onClick={() => update('ownerOccupied', '')}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Occupancy Status</div>
        <div className='mt-2 space-y-3 pl-1'>
          <RadioInput
            label='Vacant'
            checked={ownerInfoDgFilters.occupancyStatus === 'Y'}
            onClick={() => update('occupancyStatus', 'Y')}
          />
          <RadioInput
            label='No Vacant'
            checked={ownerInfoDgFilters.occupancyStatus === 'N'}
            onClick={() => update('occupancyStatus', 'N')}
          />
          <RadioInput
            label='Any'
            checked={ownerInfoDgFilters.occupancyStatus === ''}
            onClick={() => update('occupancyStatus', '')}
          />
        </div>
      </FilterItem>

      <FilterItem>
        <div className={style.textLg}>Number of Properties Owned</div>
        <div className='my-3  flex items-center'>
          <div className='flex justify-between space-x-3'>
            <div className='w-1/2'>
              <div className={style.textSm}>min</div>
              <NumberInput
                value={ownerInfoDgFilters.numberOfPropertiesOwnedMin}
                onChange={(value) =>
                  update('numberOfPropertiesOwnedMin', value)
                }
              />
            </div>
            <div className='w-1/2'>
              <div className={style.textSm}>max</div>
              <NumberInput
                value={ownerInfoDgFilters.numberOfPropertiesOwnedMax}
                onChange={(value) =>
                  update('numberOfPropertiesOwnedMax', value)
                }
              />
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <CheckInput
            label={'Include properties with no known last sale date'}
            color='green'
            checked={ownerInfoDgFilters.numberOfPropertiesOwnedInclude}
            onClick={() =>
              update(
                'numberOfPropertiesOwnedInclude',
                !ownerInfoDgFilters.numberOfPropertiesOwnedInclude
              )
            }
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Tax Exemption Status</div>
        <div className='mt-2'>
          <Dropdown options={['Any']} values={['']} selectedValue={''} />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Absentee Owner Location</div>
        <div className='mt-2'>
          <Dropdown
            options={['Any', 'Out of City', 'Out of State']}
            values={['', 'Out of City', 'Out of State', '']}
            selectedValue={ownerInfoDgFilters.absenteeOwnerLocation}
            onClick={(value) => update('absenteeOwnerLocation', value)}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Bank Owned</div>
        <div className='mt-2 space-y-3 pl-1'>
          <RadioInput
            label='Bank Owned'
            checked={ownerInfoDgFilters.bankOwned === 'Y'}
            onClick={() => update('bankOwned', 'Y')}
          />
          <RadioInput
            label='No Bank Owned'
            checked={ownerInfoDgFilters.bankOwned === 'N'}
            onClick={() => update('bankOwned', 'N')}
          />
          <RadioInput
            label='Any'
            checked={ownerInfoDgFilters.bankOwned === ''}
            onClick={() => update('bankOwned', '')}
          />
        </div>
      </FilterItem>
    </div>
  );
};

export default OwnerInfoDemographicsPanel;

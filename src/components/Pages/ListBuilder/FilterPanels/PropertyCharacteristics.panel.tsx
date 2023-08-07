import React from 'react';

import Dropdown from '@/components/Dropdown/Dropdown.component';
import NumberInput from '@/components/NumberInput/NumberInput.component';
import RadioInput from '@/components/RadioInput/RadioInput.component';
import Range from '@/components/Range/Range.component';

import { setData } from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import FilterItem from './FilterItem.component';
import style from './style.module.scss';

const PropertyCharacteristicsPanel = () => {
  const dataId: string = 'propertyCharcFilters';
  const { filters }: any = useSelector((state: any) => state.listBuilder);
  const { propertyCharcFilters } = filters;

  const update = (key: string, value: any) => {
    const data: any = {
      dataId,
      key,
      value,
    };
    dispatch(setData(data));
  };

  const propertyType = [
    'Any',
    'Commercial Office (General)',
    'Retail Stores (Personal Services, Photography, Travel)',
    'Residential (General) (Single)',
    'Single Family Residential',
    'Residential-Vacant Land',
    'Vacant Land (General)',
    'Commercial (General)',
    'Campground, RV Park',
    'Mobile/Manufactured Home (regardless of Land ownership)',
  ];

  const propertyClassification = [
    'Any',
    'OFFICE',
    'COMMERCIAL',
    'RESIDENTIAL',
    'VACANT',
  ];

  return (
    <div className='flex space-x-6'>
      <FilterItem>
        <div className={style.textLg}>Property Classification</div>
        <div className='my-3'>
          <Dropdown
            options={propertyClassification}
            values={[''].concat(propertyClassification.slice(1))}
            selectedValue={propertyCharcFilters.propertyClassification}
            onClick={(value) => {
              update('propertyClassification', value);
            }}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Property Type</div>
        <div className='my-3'>
          <Dropdown
            options={propertyType}
            values={[''].concat(propertyType.slice(1))}
            selectedValue={propertyCharcFilters.propertyType}
            onClick={(value) => update('propertyType', value)}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Beds</div>
        <div className='my-3  flex items-center'>
          <div className='flex justify-between space-x-3'>
            <div className='w-1/2'>
              <div className={style.textSm}>min</div>
              <NumberInput
                value={propertyCharcFilters.bedsMin}
                onChange={(value) => {
                  update('bedsMin', value);
                }}
              />
            </div>
            <div className='w-1/2'>
              <div className={style.textSm}>max</div>
              <NumberInput
                value={propertyCharcFilters.bedsMax}
                onChange={(value) => {
                  update('bedsMax', value);
                }}
              />
            </div>
          </div>
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Baths</div>
        <div className='my-3  flex items-center'>
          <div className='flex justify-between space-x-3'>
            <div className='w-1/2'>
              <div className={style.textSm}>min</div>
              <NumberInput
                value={propertyCharcFilters.bathsMin}
                onChange={(value) => {
                  update('bathsMin', value);
                }}
              />
            </div>
            <div className='w-1/2'>
              <div className={style.textSm}>max</div>
              <NumberInput
                value={propertyCharcFilters.bathsMax}
                onChange={(value) => {
                  update('bathsMax', value);
                }}
              />
            </div>
          </div>
        </div>
      </FilterItem>

      <FilterItem>
        <div className={style.textLg}>Building Size (SqFt)</div>
        <div className={style.priceInput + ' flex justify-between my-2'}>
          <input
            type='number'
            value={propertyCharcFilters.buildingSizeMin}
            onChange={(e) =>
              update('buildingSizeMin', Number(e.target.value) + '')
            }
          />
          <input
            type='number'
            value={propertyCharcFilters.buildingSizeMax}
            onChange={(e) =>
              update('buildingSizeMax', Number(e.target.value) + '')
            }
          />
        </div>
        <Range
          value={[
            propertyCharcFilters.buildingSizeMin,
            propertyCharcFilters.buildingSizeMax,
          ]}
          max={5000}
          onChange={(value: Array<number>) => {
            update('buildingSizeMin', value[0] ?? 0);
            update('buildingSizeMax', value[1] ?? 0);
          }}
        />
        <div className='mb-2 flex justify-between space-x-3'>
          <div className={style.textSm}>min</div>
          <div className={style.textSm}>max</div>
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Lot Size (SqFt)</div>
        <div className={style.priceInput + ' flex justify-between my-2'}>
          <input
            type='number'
            value={propertyCharcFilters.lotSizeMin}
            onChange={(e) => update('lotSizeMin', Number(e.target.value) + '')}
          />
          <input
            type='number'
            value={propertyCharcFilters.lotSizeMax}
            onChange={(e) => update('lotSizeMax', Number(e.target.value) + '')}
          />
        </div>
        <Range
          value={[
            propertyCharcFilters.lotSizeMin,
            propertyCharcFilters.lotSizeMax,
          ]}
          max={50000}
          onChange={(value: Array<number>) => {
            update('lotSizeMin', value[0] ?? 0);
            update('lotSizeMax', value[1] ?? 0);
          }}
        />
        <div className='mb-2 flex justify-between space-x-3'>
          <div className={style.textSm}>min</div>
          <div className={style.textSm}>max</div>
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Year Built</div>
        <div className={style.priceInput + ' flex justify-between my-2'}>
          <input
            type='number'
            value={propertyCharcFilters.yearBuiltMin}
            onChange={(e) =>
              update('yearBuiltMin', Number(e.target.value) + '')
            }
          />
          <input
            type='number'
            value={propertyCharcFilters.yearBuiltMax}
            onChange={(e) =>
              update('yearBuiltMax', Number(e.target.value) + '')
            }
          />
        </div>
        <Range
          value={[
            propertyCharcFilters.yearBuiltMin,
            propertyCharcFilters.yearBuiltMax,
          ]}
          max={new Date().getFullYear()}
          onChange={(value: Array<number>) => {
            update('yearBuiltMin', value[0] ?? 0);
            update('yearBuiltMax', value[1] ?? 0);
          }}
        />
        <div className='mb-2 flex justify-between space-x-3'>
          <div className={style.textSm}>min</div>
          <div className={style.textSm}>max</div>
        </div>
      </FilterItem>

      <FilterItem>
        <div className={style.textLg}>Number of Stories</div>
        <div className='my-3'>
          <Dropdown
            options={['Any', '1 Story', '2 Stories']}
            values={['', '1 Story', '2 Stories']}
            selectedValue={propertyCharcFilters.numberOfStories}
            onClick={(value) => update('numberOfStories', value)}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Has HOA</div>
        <div className='mt-2 space-y-3 pl-1'>
          <RadioInput
            label='Only HOA Properties'
            checked={propertyCharcFilters.hasHoa === 'Y'}
            onClick={() => update('hasHoa', 'Y')}
          />
          <RadioInput
            label='No HOA Properties'
            checked={propertyCharcFilters.hasHoa === 'N'}
            onClick={() => update('hasHoa', 'N')}
          />
          <RadioInput
            label='Any'
            checked={propertyCharcFilters.hasHoa === ''}
            onClick={() => update('hasHoa', '')}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Property Features</div>
        <div className='my-3'>
          <Dropdown options={['Any']} values={['']} selectedValue={''} />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Unit Number Range</div>
        <div className='my-3  flex items-center'>
          <div className='flex justify-between space-x-3'>
            <div className='w-1/2'>
              <div className={style.textSm}>min</div>
              <NumberInput
                value={propertyCharcFilters.unitNumberRangeMin}
                onChange={(value) => {
                  update('unitNumberRangeMin', value);
                }}
              />
            </div>
            <div className='w-1/2'>
              <div className={style.textSm}>max</div>
              <NumberInput
                value={propertyCharcFilters.unitNumberRangeMax}
                onChange={(value) => {
                  update('unitNumberRangeMax', value);
                }}
              />
            </div>
          </div>
        </div>
      </FilterItem>
    </div>
  );
};

export default PropertyCharacteristicsPanel;

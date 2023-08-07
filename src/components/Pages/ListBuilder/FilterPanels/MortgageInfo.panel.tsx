import React from 'react';

import Dropdown from '@/components/Dropdown/Dropdown.component';
import RadioInput from '@/components/RadioInput/RadioInput.component';
import Range from '@/components/Range/Range.component';

import { setData } from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import FilterItem from './FilterItem.component';
import style from './style.module.scss';

const MortgageInfoPanel = () => {
  const dataId: string = 'mortgageInfoFilters';

  const { filters }: any = useSelector((state: any) => state.listBuilder);
  const { mortgageInfoFilters } = filters;

  const update = (key: string, value: any) => {
    const data: any = {
      dataId,
      key,
      value,
    };
    dispatch(setData(data));
  };

  const loanTypes = [
    'Any',
    'New Conventional',
    'FHA',
    'Building or Construction Loan',
    'VA',
    'Commercial',
    'Stand Alone Second',
    'Purchase Money Mortgage',
    'Credit Line (Revolving)',
    'ARM (Adjustable Rate Mortgage as of August, 2009)',
  ];

  return (
    <div className='flex space-x-6'>
      <FilterItem>
        <div className={style.textLg}>Loan Type(s)</div>
        <div className='mt-2'>
          <Dropdown
            options={loanTypes}
            values={[''].concat(loanTypes.slice(1))}
            selectedValue={mortgageInfoFilters.loanType}
            onClick={(value) => update('loanType', value)}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Open Mortgages</div>
        <div className={style.priceInput + ' flex justify-between my-2'}>
          <input
            type='number'
            value={mortgageInfoFilters.openMortgagesMin}
            onChange={(e) =>
              update('openMortgagesMin', Number(e.target.value) + '')
            }
          />
          <input
            type='number'
            value={mortgageInfoFilters.openMortgagesMax}
            onChange={(e) =>
              update('openMortgagesMax', Number(e.target.value) + '')
            }
          />
        </div>
        <Range
          value={[
            mortgageInfoFilters.openMortgagesMin,
            mortgageInfoFilters.openMortgagesMax,
          ]}
          onChange={(value: Array<number>) => {
            update('openMortgagesMin', value[0] ?? 0);
            update('openMortgagesMax', value[1] ?? 0);
          }}
        />
        <div className='-mt-2 mb-2 flex justify-between space-x-3'>
          <div className={style.textSm}>min</div>
          <div className={style.textSm}>max</div>
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Open Lien Amount</div>
        <div className={style.priceInput + ' flex justify-between my-2'}>
          <input
            type='number'
            value={mortgageInfoFilters.openLienAmountMin}
            onChange={(e) =>
              update('openLienAmountMin', Number(e.target.value) + '')
            }
          />
          <input
            type='number'
            value={mortgageInfoFilters.openLienAmountMax}
            onChange={(e) =>
              update('openLienAmountMax', Number(e.target.value) + '')
            }
          />
        </div>
        <Range
          value={[
            mortgageInfoFilters.openLienAmountMin,
            mortgageInfoFilters.openLienAmountMax,
          ]}
          onChange={(value: Array<number>) => {
            update('openLienAmountMin', value[0] ?? 0);
            update('openLienAmountMax', value[1] ?? 0);
          }}
        />
        <div className='-mt-2 flex justify-between space-x-3'>
          <div className={style.textSm}>min</div>
          <div className={style.textSm}>max</div>
        </div>
      </FilterItem>

      <FilterItem>
        <div className={style.textLg}>Interest Rate % (Est)</div>
        <div className={style.priceInput + ' flex justify-between my-2'}>
          <input
            type='number'
            value={mortgageInfoFilters.interestRatePercentMin}
            onChange={(e) =>
              update('interestRatePercentMin', Number(e.target.value) + '')
            }
          />
          <input
            type='number'
            value={mortgageInfoFilters.interestRatePercentMax}
            onChange={(e) =>
              update('interestRatePercentMax', Number(e.target.value) + '')
            }
          />
        </div>
        <Range
          value={[
            mortgageInfoFilters.interestRatePercentMin,
            mortgageInfoFilters.interestRatePercentMax,
          ]}
          onChange={(value: Array<number>) => {
            update('interestRatePercentMin', value[0] ?? 0);
            update('interestRatePercentMax', value[1] ?? 0);
          }}
        />
        <div className='-mt-2 mb-2 flex justify-between space-x-3'>
          <div className={style.textSm}>min</div>
          <div className={style.textSm}>max</div>
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Interest Rate Type(s)</div>
        <div className='mt-2'>
          <Dropdown
            options={['Any']}
            values={['']}
            selectedValue={''}
            onClick={(value) => update('interestRateType', value)}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Cash Buyer</div>
        <div className='mt-2 space-y-3 pl-1'>
          <RadioInput
            label='Yes'
            checked={mortgageInfoFilters.cashBuyer === 'Y'}
            onClick={() => update('cashBuyer', 'Y')}
          />
          <RadioInput
            label='No'
            checked={mortgageInfoFilters.cashBuyer === 'N'}
            onClick={() => update('cashBuyer', 'N')}
          />
          <RadioInput
            label='Any'
            checked={mortgageInfoFilters.cashBuyer === ''}
            onClick={() => update('cashBuyer', '')}
          />
        </div>
      </FilterItem>

      <FilterItem>
        <div className={style.textLg}>{'Owned Free & Clear'}</div>
        <div className='mt-2 space-y-3 pl-1'>
          <RadioInput
            label='Yes'
            checked={mortgageInfoFilters.ownedFreeClear === 'Y'}
            onClick={() => update('ownedFreeClear', 'Y')}
          />
          <RadioInput
            label='No'
            checked={mortgageInfoFilters.ownedFreeClear === 'N'}
            onClick={() => update('ownedFreeClear', 'N')}
          />
          <RadioInput
            label='Any'
            checked={mortgageInfoFilters.ownedFreeClear === ''}
            onClick={() => update('ownedFreeClear', '')}
          />
        </div>

        <div className={style.hSeperator}></div>

        <div className={style.textLg}>Seller Carry Back</div>
        <div className='mt-2 space-y-3 pl-1'>
          <RadioInput
            label='Yes'
            checked={mortgageInfoFilters.sellerCarryBack === 'Y'}
            onClick={() => update('sellerCarryBack', 'Y')}
          />
          <RadioInput
            label='No'
            checked={mortgageInfoFilters.sellerCarryBack === 'N'}
            onClick={() => update('sellerCarryBack', 'N')}
          />
          <RadioInput
            label='Any'
            checked={mortgageInfoFilters.sellerCarryBack === ''}
            onClick={() => update('sellerCarryBack', '')}
          />
        </div>
      </FilterItem>
    </div>
  );
};

export default MortgageInfoPanel;

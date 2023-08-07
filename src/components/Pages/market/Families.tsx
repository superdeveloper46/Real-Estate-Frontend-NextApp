import React from 'react';

import BarChart from '@/components/Chart/BarChart.component';
import PieChart from '@/components/Chart/PieChart.component';

import styles from './style.module.scss';

const Families = () => {
  const householdData = [
    { x: 'Married Couples', y: 10 },
    { x: 'Male Householders', y: 20 },
    { x: 'Female Householders', y: 10 },
    { x: 'Non-Family', y: 60 },
  ];

  const householdColorScale = ['#00008B', '#298FC2', '#88DBA8', '#DEDEDC'];

  const maritalStatusColorScale = ['#00008B', '#DEDEDC'];

  const maritalStatusData = [
    { x: 'Married', y: 10 },
    { x: 'Single', y: 90 },
  ];

  const neverMarriedData = [
    { x: 'Male', y: 6 },
    { x: 'Female', y: 2 },
  ];

  const nowMarriedData = [
    { x: 'Male', y: 5 },
    { x: 'Female', y: 4 },
  ];

  const divorceMarriedData = [
    { x: 'Male', y: 4 },
    { x: 'Female', y: 7 },
  ];

  const ageGroupData = [
    { x: '15-19', y: 24 },
    { x: '20-24', y: 25 },
    { x: '25-29', y: 25 },
    { x: '30-35', y: 33 },
    { x: '35-39', y: 33 },
    { x: '40-44', y: 33 },
    { x: '45-50', y: 18 },
  ];

  return (
    <div className='space-y-3.5' id='families'>
      <div className={styles.text_title}>Families</div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Household</div>
        <div className={styles.container}>
          <div className='flex space-x-4'>
            <div className='w-[45%]'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/families_household.svg'
                  alt='household icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  24,070<span className={styles.number_text_sm}>±1,797</span>
                </div>
              </div>
              <div className={`${styles.text_lg} whitespace-nowrap`}>
                Number of households
              </div>
              <div className='ml-6 mt-3'>
                <ul className='list-disc'>
                  <li className={styles.text_sm}>
                    the Napa, CA Metro Area: 48,745 ±544
                  </li>
                  <li className={styles.text_sm}>
                    California: 13,217,586 ±19,810
                  </li>
                </ul>
              </div>
            </div>

            <div className='w-[55%] space-y-2'>
              <div className={styles.text_md}>Population by household type</div>
              <PieChart
                labelTitle={'Married Couples'}
                labelContent={'10%'}
                data={householdData}
                colorScale={householdColorScale}
              />
            </div>
          </div>

          <div className={`${styles.number_text_md} !m-0 !text-right`}>
            Show Data / Embed
          </div>

          <div className={`${styles.seperator}`}></div>

          <div>
            <div className='flex items-center space-x-2'>
              <img
                src='/assets/images/market/families_household.svg'
                alt='household icon'
                className='h-6'
              />
              <div className={styles.number_text_lg}>
                24,070<span className={styles.number_text_sm}>±1,797</span>
              </div>
            </div>
            <div className={`${styles.text_lg} whitespace-nowrap`}>
              Persons per household
            </div>
            <div className='ml-6 mt-3'>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  a little less than the figure in the Napa, CA Metro Area: 2.8
                  135,048 (±0 / ±451)
                </li>
                <li className={styles.text_sm}>
                  about 90 percent of the figure in California: 2.9 38,640,268
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Marital status</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-3'>
            <div className='w-[45%] space-y-2'>
              <div className={styles.text_md}>Status</div>
              <PieChart
                labelTitle={'Female'}
                labelContent={'90%'}
                data={maritalStatusData}
                colorScale={maritalStatusColorScale}
              />
            </div>

            <div className='w-[55%] space-y-2'>
              <div className={styles.text_md}>Marital Status by Sex</div>
              <div className='flex space-x-2'>
                <div className='w-1/3 space-y-2'>
                  <BarChart
                    data={neverMarriedData}
                    barWidth={57}
                    minX='Female'
                    width={130}
                  />
                  <div className={'text-center text-sxs'}>Never Married</div>
                </div>
                <div className='w-1/3 space-y-2'>
                  <BarChart
                    data={nowMarriedData}
                    barWidth={57}
                    minX=''
                    width={130}
                  />
                  <div className={'text-center text-sxs'}>Now Married</div>
                </div>
                <div className='w-1/3 space-y-2'>
                  <BarChart
                    data={divorceMarriedData}
                    barWidth={57}
                    minX=''
                    width={130}
                  />
                  <div className={'text-center text-sxs'}>Divorced</div>
                </div>
              </div>
              <div className='text-[10px] text-sfra-gray-200'>
                * Hispanic includes respondents of any race. Other categories
                are non-Hispanic.
              </div>
            </div>
          </div>

          <div className='flex space-x-3'>
            <div className='w-[45%] space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>

            <div className='w-[55%] space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Fertility</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-8'>
            <div className='w-1/2'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/families_household.svg'
                  alt='families household icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  4.7%<span className={styles.number_text_sm}>±1.5%</span>
                </div>
              </div>
              <div className={`${styles.text_lg}`}>
                Women 15-50 who gave birth during past year
              </div>
            </div>
            <div className='w-1/2'>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  about the same as the rate in the Napa, CA Metro Area: 4.6% †
                  1,438 (±0.9% / ±285)
                </li>
                <li className={styles.text_sm}>
                  a little less than the rate in California: 4.8% 461,770 (±0.1%
                  / ±5,716)
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className=' space-y-2'>
              <div className={styles.text_md}>
                Women who gave birth during past year, by age group
              </div>
              <div className='!-mt-4'>
                <BarChart
                  barWidth={60}
                  data={ageGroupData}
                  minX={'45-50'}
                  height={150}
                  radius={false}
                />
              </div>
            </div>
          </div>

          <div className=' flex items-center justify-between'>
            <div className='text-[10px] text-sfra-gray-200'>
              *Universe: Workers 16 years and over
            </div>
            <div className={styles.number_text_md}>Show Data / Embed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Families;

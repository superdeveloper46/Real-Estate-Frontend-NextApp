import React from 'react';

import BarChart from '@/components/Chart/BarChart.component';
import PieChart from '@/components/Chart/PieChart.component';

import styles from './style.module.scss';

const Economics = () => {
  const povertyScale = ['#00008B', '#DEDEDC'];

  const povertyChildrenData = [
    { x: 'Poverty', y: 10 },
    { x: 'Non-Poverty', y: 90 },
  ];

  const povertySeniorsData = [
    { x: 'Poverty', y: 50 },
    { x: 'Non-Poverty', y: 50 },
  ];

  const householdData = [
    { x: 'Under $50K', y: 24 },
    { x: '$50K - $100K', y: 25 },
    { x: '$100K - $200K', y: 33 },
    { x: 'Over $200K', y: 18 },
  ];

  const transportData = [
    { x: 'Drove alone', y: 24 },
    { x: 'Carpooled', y: 25 },
    { x: 'Public transit', y: 25 },
    { x: 'Bicycle', y: 33 },
    { x: 'Walked', y: 33 },
    { x: 'Other', y: 33 },
    { x: 'Worked at home', y: 18 },
  ];

  return (
    <div className='space-y-3.5' id='economics'>
      <div className={styles.text_title}>Economics</div>

      <div className='space-y-3'>
        <div className={styles.container}>
          <div className='flex space-x-8'>
            <div className='w-1/2'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/economics_income.svg'
                  alt='economic income icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  $102,244<span className={styles.number_text_sm}>±1,797</span>
                </div>
              </div>
              <div className={`${styles.text_lg} whitespace-nowrap`}>
                Per capita income
              </div>
              <div className='ml-4 mt-2'>
                <ul className='list-disc'>
                  <li className={styles.text_sm}>
                    about the same as the amount in the Napa, CA Metro Area:
                    $49,641 ±$1,839
                  </li>
                  <li className={styles.text_sm}>
                    about 20 percent higher than the amount in California:
                    $41,276 ±$139
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-1/2'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/economics_income.svg'
                  alt='economics income icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  $102,244<span className={styles.number_text_sm}>±1,797</span>
                </div>
              </div>
              <div className={`${styles.text_lg} whitespace-nowrap`}>
                Median household income
              </div>
              <div className='ml-4 mt-2'>
                <ul className='list-disc'>
                  <li className={styles.text_sm}>
                    a little higher than the amount in the Napa, CA Metro Area:
                    $97,498 ±$3,817
                  </li>
                  <li className={styles.text_sm}>
                    about 25 percent higher than the amount in California:
                    $84,097 ±$236
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className=' space-y-2'>
              <div className={styles.text_md}>Household Income</div>
              <div className='!-mt-7'>
                <BarChart
                  barWidth={100}
                  data={householdData}
                  minX={'Over $200K'}
                  height={170}
                  radius={false}
                />
              </div>
            </div>
          </div>

          <div className='!-mt-3 space-y-2'>
            <div className={styles.number_text_md}>Show Data / Embed</div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Poverty</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-8'>
            <div>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/economics_poverty.svg'
                  alt='economics poverty icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  6.7%<span className={styles.number_text_sm}>±1,797</span>
                </div>
              </div>
              <div className={`${styles.text_lg} whitespace-nowrap`}>
                Persons below poverty line
              </div>
            </div>
            <div>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  about 90 percent of the rate in the Napa, CA Metro Area: 7.7%
                  † 10,394 (±0.8% / ±1,143)
                </li>
                <li className={styles.text_sm}>
                  about half the rate in California: 12.3%
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Children (Under 18)</div>
              <PieChart
                labelTitle={'Poverty'}
                labelContent={'10%'}
                data={povertyChildrenData}
                colorScale={povertyScale}
              />
            </div>

            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Seniors (65 and over)</div>
              <PieChart
                labelTitle={'Poverty'}
                labelContent={'50%'}
                data={povertySeniorsData}
                colorScale={povertyScale}
              />
            </div>
          </div>

          <div className='flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>

            <div className='space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Transportation to work</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-8'>
            <div>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/economics_transportation.svg'
                  alt='economics transportation icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  25.3<span className={styles.number_text_sm}>Minutes</span>
                </div>
              </div>
              <div className={`${styles.text_lg} whitespace-nowrap`}>
                Mean travel time to work
              </div>
            </div>
            <div>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  a little less than the figure in the Napa, CA Metro Area: 26.2
                  1,635,810 (±0.6 / ±49,650)
                </li>
                <li className={styles.text_sm}>
                  about 80 percent of the figure in California: 29.6 478,871,000
                  (±0.1 / ±1,246,675)
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className=' space-y-2'>
              <div className={styles.text_md}>
                Means of transportation to work
              </div>
              <div className='!-mt-4'>
                <BarChart
                  barWidth={60}
                  data={transportData}
                  minX={'Worked at home'}
                  height={170}
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

export default Economics;

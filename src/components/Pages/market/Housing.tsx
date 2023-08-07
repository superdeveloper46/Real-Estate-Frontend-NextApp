import React from 'react';

import BarChart from '@/components/Chart/BarChart.component';
import PieChart from '@/components/Chart/PieChart.component';

import styles from './style.module.scss';

const Housing = () => {
  const occupiedScale = ['#00008B', '#DEDEDC'];

  const occupiedVacantData = [
    { x: 'Occupied', y: 10 },
    { x: 'Vacant', y: 90 },
  ];

  const ownerRenterData = [
    { x: 'Owner occupied', y: 10 },
    { x: 'Renter Occupied', y: 90 },
  ];

  const typesScale = ['#00008B', '#298FC2', '#88DBA8', '#DEDEDC'];

  const typesData = [
    { x: 'Single Unit', y: 30 },
    { x: 'Mobile Home', y: 10 },
    { x: 'Boat, Rv, Van, Etc', y: 20 },
    { x: 'Multi Unit', y: 40 },
  ];

  const yearMovedData = [
    { x: '<1990', y: 6 },
    { x: '1990s', y: 2 },
    { x: '2000s', y: 4 },
    { x: '2010\n-2014', y: 3 },
    { x: '2015\n-2016', y: 4 },
    { x: 'since\n 2017', y: 5 },
  ];

  const valueData = [
    { x: '<$100k', y: 24 },
    { x: '$100k-$200k', y: 25 },
    { x: '$200k-$300k', y: 25 },
    { x: '$300k-$400k', y: 33 },
    { x: '$400k-$500k', y: 33 },
    { x: '$500k-$1m', y: 33 },
    { x: '>$1m', y: 18 },
  ];

  const geographicalData = [
    { x: 'Same house year ago', y: 25 },
    { x: 'From same county', y: 33 },
    { x: 'From different county', y: 33 },
    { x: 'From different state', y: 33 },
    { x: 'From abroad', y: 18 },
  ];

  return (
    <div className='space-y-3.5' id='housing'>
      <div className={styles.text_title}>Housing</div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Units & Occupancy</div>
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
                Number of housing units
              </div>
            </div>
            <div>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  the Napa, CA Metro Area: 55,446 ±176
                </li>
                <li className={styles.text_sm}>
                  California: 14,328,539 ±1,595
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Occupied vs. Vacant</div>
              <PieChart
                labelTitle={'Occupied'}
                labelContent={'10%'}
                data={occupiedVacantData}
                colorScale={occupiedScale}
              />
            </div>

            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Ownership of occupied units</div>
              <PieChart
                labelTitle={'Owner Occupied'}
                labelContent={'10%'}
                data={ownerRenterData}
                colorScale={occupiedScale}
              />
            </div>
          </div>

          <div className='!mt-0 flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>

            <div className='space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Types of structure</div>
              <PieChart
                labelTitle={'Single Unit'}
                labelContent={'30%'}
                data={typesData}
                colorScale={typesScale}
              />
            </div>

            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>
                Year moved in, by percentage of population
              </div>
              <BarChart data={yearMovedData} barWidth={55} minX='1990s' />
            </div>
          </div>

          <div className='flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>

            <div className='w-1/2 space-y-2'>
              <div className={styles.number_text_md}>Show Data / Embed</div>
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Value</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-8'>
            <div className='w-1/2'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/housing_value.svg'
                  alt='housing value icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  $693,700<span className={styles.number_text_sm}>±1.5%</span>
                </div>
              </div>
              <div className={`${styles.text_lg}`}>
                Median value of owner-occupied housing units
              </div>
            </div>
            <div className='w-1/2'>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  about the same as the amount in the Napa, CA Metro Area:
                  $685,500 ±$10,151
                </li>
                <li className={styles.text_sm}>
                  about 20 percent higher than the amount in California:
                  $573,200 ±$1,125
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className=' space-y-2'>
              <div className={styles.text_md}>
                Value of owner-occupied housing units
              </div>
              <div className='!-mt-4'>
                <BarChart
                  barWidth={50}
                  data={valueData}
                  minX={'>$1m'}
                  height={150}
                  radius={false}
                />
              </div>
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <div className={styles.number_text_md}>Show Data / Embed</div>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Geographical mobility</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-8'>
            <div className='w-1/2'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/housing_value.svg'
                  alt='housing value icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  10.5%<span className={styles.number_text_sm}>±1.5%</span>
                </div>
              </div>
              <div className={`${styles.text_lg}`}>
                Moved since previous year
              </div>
            </div>
            <div className='w-1/2'>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  a little less than the rate in the Napa, CA Metro Area: 10.9%
                  14,981 (±0.8% / ±1,115.9)
                </li>
                <li className={styles.text_sm}>
                  about 90 percent of the rate in California: 12% 4,685,365
                  (±0.1% / ±28,785.1)
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className=' space-y-2'>
              <div className={styles.text_md}>
                Population migration since previous year
              </div>
              <div className='!-mt-4'>
                <BarChart
                  barWidth={80}
                  data={geographicalData}
                  minX={'From abroad'}
                  height={150}
                  radius={false}
                />
              </div>
            </div>
          </div>

          <div className='!mt-0 flex items-center justify-end'>
            <div className={styles.number_text_md}>Show Data / Embed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Housing;

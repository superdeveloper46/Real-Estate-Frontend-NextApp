import React from 'react';

import BarChart from '@/components/Chart/BarChart.component';
import PieChart from '@/components/Chart/PieChart.component';

import styles from './style.module.scss';

const Demographic = () => {
  const sexGenderColorScale = ['#00008B', '#DEDEDC'];

  const sexGenderData = [
    { x: 'Male', y: 10 },
    { x: 'Female', y: 90 },
  ];

  const sexEthnicityData = [
    { x: 'White', y: 2 },
    { x: 'Black', y: 3 },
    { x: 'Native', y: 6 },
    { x: 'Asion', y: 3 },
    { x: 'Other', y: 2 },
    { x: 'Two+', y: 3 },
    { x: 'Hisp', y: 5 },
  ];

  const ageCategoryColorScale = ['#298FC2', '#00008B', '#DEDEDC'];

  const ageRangeData = [
    { x: '0-9', y: 2 },
    { x: '10-19', y: 3 },
    { x: '20-29', y: 6 },
    { x: '30-39', y: 3 },
    { x: '40-49', y: 2 },
    { x: '50-59', y: 3 },
    { x: '+60', y: 5 },
  ];

  const ageCategoryData = [
    { x: '-18', y: 10 },
    { x: '18-64', y: 31 },
    { x: '+60', y: 59 },
  ];

  return (
    <div className='space-y-3.5' id='demographic'>
      <div className={styles.text_title}>Demographic</div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Age</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-8'>
            <div>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/demographic_age.svg'
                  alt='demographic icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  43.51<span className={styles.number_text_sm}>±1</span>
                </div>
              </div>
              <div className={`${styles.text_lg} whitespace-nowrap`}>
                Per capita income
              </div>
            </div>
            <div>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  a little higher than the figure in the Napa, CA Metro Area:
                  42.1 ±0.3
                </li>
                <li className={styles.text_sm}>
                  about 20 percent higher than the figure in California: 37 ±0.1
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Population by age range</div>
              <BarChart data={ageRangeData} barWidth={50} minX='0-9' />
            </div>

            <div className='space-y-2'>
              <div className={styles.text_md}>Population by age category</div>
              <PieChart
                labelTitle={'18 to 64'}
                labelContent={'59%'}
                data={ageCategoryData}
                colorScale={ageCategoryColorScale}
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
        <div className={styles.text_subTitle}>Sex</div>
        <div className={styles.sub_text}>
          Margin of error is at least 10 percent of the total value. Take care
          with this statistic.
        </div>
        <div className={styles.container}>
          <div className='flex space-x-3'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Gender</div>
              <PieChart
                labelTitle={'Female'}
                labelContent={'90%'}
                data={sexGenderData}
                colorScale={sexGenderColorScale}
              />
            </div>

            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Race & Ethnicity</div>
              <BarChart data={sexEthnicityData} barWidth={50} minX='Other' />
              <div className='text-[10px] text-sfra-gray-200'>
                * Hispanic includes respondents of any race. Other categories
                are non-Hispanic.
              </div>
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
    </div>
  );
};

export default Demographic;

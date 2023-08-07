import React from 'react';

import BarChart from '@/components/Chart/BarChart.component';
import PieChart from '@/components/Chart/PieChart.component';

import styles from './style.module.scss';

const Social = () => {
  const educationalData = [
    { x: 'No degree', y: 25 },
    { x: 'High school', y: 33 },
    { x: 'Some college', y: 33 },
    { x: "Bachelor's", y: 33 },
    { x: 'Post-grad', y: 18 },
  ];

  const languageScale = ['#00008B', '#298FC2', '#88DBA8', '#F5C518', '#DEDEDC'];

  const languageChildrenData = [
    { x: 'English Only', y: 10 },
    { x: 'Indo-European', y: 10 },
    { x: 'Asian/Islander', y: 10 },
    { x: 'Spanish', y: 10 },
    { x: 'Other', y: 60 },
  ];

  const languageAdultData = [
    { x: 'English Only', y: 15 },
    { x: 'Indo-European', y: 30 },
    { x: 'Asian/Islander', y: 5 },
    { x: 'Spanish', y: 10 },
    { x: 'Other', y: 40 },
  ];

  const placeOfBirthData = [
    { x: 'Europe', y: 25 },
    { x: 'Asia', y: 33 },
    { x: 'Africa', y: 33 },
    { x: 'Oceania', y: 33 },
    { x: 'Latin America', y: 33 },
    { x: 'North America', y: 18 },
  ];

  const veteranData = [
    { x: 'WWII', y: 25 },
    { x: 'Korea', y: 33 },
    { x: 'Vietnam', y: 33 },
    { x: 'Gulf(1990)', y: 33 },
    { x: 'Gulf(2001-)', y: 18 },
  ];

  return (
    <div className='space-y-3.5' id='social'>
      <div className={styles.text_title}>Social</div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Educational attainment</div>
        <div className={styles.container}>
          <div className='flex space-x-4'>
            <div className='w-1/2'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/social_educational.svg'
                  alt='social educational icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  85.2%<span className={styles.number_text_sm}>±$1,797</span>
                </div>
              </div>
              <div className={`${styles.text_lg}`}>
                High school grad or higher
              </div>
              <div className='ml-5 mt-4'>
                <ul className='list-disc'>
                  <li className={styles.text_sm}>
                    about the same as the rate in the Napa, CA Metro Area: 85.2%
                    84,004 (±1.8% / ±1,818.3)
                  </li>
                  <li className={styles.text_sm}>
                    about the same as the rate in California: 84.2% 22,561,035
                    (±0.2% / ±42,563.7)
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-1/2'>
              <div className='flex items-center space-x-2'>
                <img
                  src='/assets/images/market/social_educational.svg'
                  alt='social educational icon'
                  className='h-6'
                />
                <div className={styles.number_text_lg}>
                  36.8%<span className={styles.number_text_sm}>±$1,797</span>
                </div>
              </div>
              <div className={`${styles.text_lg}`}>
                {"Bachelor's degree or higher"}
              </div>
              <div className='ml-5 mt-4'>
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
              <div className={styles.text_md}>
                Population by highest level of education
              </div>
              <div className='!-mt-4'>
                <BarChart
                  barWidth={80}
                  data={educationalData}
                  minX={'Post-grad'}
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

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Language</div>
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
                Persons with language other than English spoken at home
              </div>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-2'>
            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>
                Language at home, children 5-17
              </div>
              <PieChart
                labelTitle={'English Only'}
                labelContent={'10%'}
                data={languageChildrenData}
                colorScale={languageScale}
              />
            </div>

            <div className='w-1/2 space-y-2'>
              <div className={styles.text_md}>Language at home, adults 18+</div>
              <PieChart
                labelTitle={'English Only'}
                labelContent={'15%'}
                data={languageAdultData}
                colorScale={languageScale}
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
        </div>
      </div>

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Place of birth</div>
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
                  18.9%<span className={styles.number_text_sm}>±1.5%</span>
                </div>
              </div>
              <div className={`${styles.text_lg}`}>Foreign-born population</div>
            </div>
            <div className='w-1/2'>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  about 90 percent of the rate in the Napa, CA Metro Area: 21.5%
                  29,822 (±0.8% / ±1,071)
                </li>
                <li className={styles.text_sm}>
                  about two-thirds of the rate in California: 26.5% 10,454,949
                  (±0.1% / ±34,327)
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className=' space-y-2'>
              <div className={styles.text_md}>
                Place of birth for foreign-born population
              </div>
              <div className='!-mt-4'>
                <BarChart
                  barWidth={60}
                  data={placeOfBirthData}
                  minX={'North America'}
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

      <div className='space-y-3'>
        <div className={styles.text_subTitle}>Veteran status</div>
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
                  18.9%<span className={styles.number_text_sm}>±1.5%</span>
                </div>
              </div>
              <div className={`${styles.text_lg}`}>
                Population with veteran status
              </div>
            </div>
            <div className='w-1/2'>
              <ul className='list-disc'>
                <li className={styles.text_sm}>
                  about 10 percent higher than the rate in the Napa, CA Metro
                  Area: 5.7% 6,280 (±0.4% / ±430)
                </li>
                <li className={styles.text_sm}>
                  about 1.3 times the rate in California: 4.8% 1,467,026 (±0% /
                  ±9,913)
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.seperator}></div>

          <div className='flex space-x-3'>
            <div className=' space-y-2'>
              <div className={styles.text_md}>Veterans by wartime service</div>
              <div className='flex space-x-4'>
                <div>
                  <BarChart
                    barWidth={80}
                    data={veteranData}
                    minX={'Gulf(2001-)'}
                    height={180}
                    radius={false}
                  />
                </div>
                <div className='space-y-1'>
                  <div className='text-black'>
                    <div className='text-ms font-semibold'>
                      3,133
                      <span className='ml-2 whitespace-nowrap text-sxs'>
                        Total veterans
                      </span>
                    </div>
                    <div className='text-sxs'>±318</div>
                  </div>
                  <div className='text-black'>
                    <div className='text-ms font-semibold'>
                      3,133
                      <span className='ml-2 whitespace-nowrap text-sxs'>
                        Total veterans
                      </span>
                    </div>
                    <div className='text-sxs'>±318</div>
                  </div>
                  <div className='text-black'>
                    <div className='text-ms font-semibold'>
                      3,133
                      <span className='ml-2 whitespace-nowrap text-sxs'>
                        Total veterans
                      </span>
                    </div>
                    <div className='text-sxs'>±318</div>
                  </div>
                </div>
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

export default Social;

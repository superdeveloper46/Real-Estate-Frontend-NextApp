import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';

import Button from '@/components/Button/Button.component';
import MapBoxClusterView from '@/components/MapBoxView/MapBoxClusterView.component';

import CategoryPanel from './CategoryPanel';

const HomePage = () => {
  const msa = [
    { id: 'Chicago, MSA', value: 'Chicago, MSA' },
    { id: 'Califonia, MSA', value: 'Califonia, MSA' },
  ];

  const buttons = [
    { index: 1, text: 'Market Rents' },
    { index: 2, text: 'Rent Distribution' },
    { index: 3, text: 'Public Record Data' },
    { index: 4, text: 'Summary Statistic' },
    { index: 5, text: 'Average Rent by Bedroom Type' },
    { index: 6, text: 'Economics' },
  ];

  const [selectedMSA, setSelectedMSA] = useState('Chicago, MSA');
  const [selectedButton, setSelectedButton] = useState(0);

  const handleChangeMSA = (value: string) => {
    setSelectedMSA(value);
  };

  const handleClickButton = (index: number) => {
    setSelectedButton(index);
  };

  return (
    <div className='flex'>
      <CategoryPanel />
      <div className='w-[calc(100vw-7rem)]'>
        <div className='round space-y-1 border-b-4 px-52 py-5'>
          <div className='px-1 text-left text-ms font-bold'>Select MSA</div>
          <Tooltip
            title={
              <React.Fragment>
                <div color='inherit'>You can select MSA for the best area</div>
                <div className='mt-2 flex justify-end'>
                  <Button
                    text='Got it'
                    classes='rounded-full'
                    textClass='!text-ms !font-semibold'
                  />
                </div>
              </React.Fragment>
            }
            arrow
            placement='bottom'
            componentsProps={{
              arrow: {
                sx: {
                  color: 'white',
                },
              },
              tooltip: {
                sx: {
                  color: 'black',
                  backgroundColor: 'white',
                  fontSize: '0.9rem',
                  fontFamily: 'Montserrat',
                  whiteSpace: 'nowrap',
                  fontWeight: '700',
                  padding: '15px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0,0,0,0.21)',
                  width: '310px !important',
                  maxWidth: '310px !important',
                },
              },
            }}
          >
            <div className='text-left'>
              <select
                name='msa'
                className='h-10 w-full rounded-md border px-1 text-ms outline-none'
                onChange={(e: any) => {
                  handleChangeMSA(e.target.value);
                }}
              >
                {msa.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </Tooltip>
          <div className='pt-5 font-montserrat text-3xl font-bold text-black'>
            {selectedMSA}
          </div>
        </div>
        <div className='flex items-center justify-center space-x-8 py-5 '>
          {buttons.map((item, index) => (
            <Button
              key={index}
              text={item.text}
              classes={`rounded-lg !h-9 bg-transparent text-black border hover:bg-sfra-blue-100/20 hover:border-sfra-blue-100/80 ${
                selectedButton === index
                  ? 'bg-sfra-blue-100/10 border-sfra-blue-100/50 !text-sfra-blue-100'
                  : ''
              }`}
              onClick={() => handleClickButton(index)}
            />
          ))}
        </div>
        <MapBoxClusterView
          mapId={'homeMap'}
          mapData={[]}
          height={'!h-[calc(100vh-293px)] !rounded-none'}
        />
      </div>
    </div>
  );
};

export default HomePage;

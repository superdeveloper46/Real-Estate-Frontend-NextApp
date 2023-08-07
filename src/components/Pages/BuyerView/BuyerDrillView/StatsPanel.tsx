import { IconButton } from '@mui/material';
import type { FeatureCollection } from 'geojson';
import React, { useEffect, useMemo, useState } from 'react';

import MapBoxBuyerView from '@/components/MapBoxView/MapBoxBuyerView.component';

import Loading from '../Loading.component';
import Table from '../Table.component';

const StatsPanel = (props: { data: any; loading: boolean }) => {
  const [selectedMark, setSelectedMark] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]);

  const header = [
    { title: 'Field', sort: false },
    { title: 'Value', sort: false },
  ];

  const getMapViewData = useMemo(
    (): FeatureCollection => ({
      type: 'FeatureCollection',
      features:
        props?.data?.map((dataPoint: any, i: number) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [dataPoint[21], dataPoint[20]],
          },
          index: i,
        })) ?? [],
    }),
    [props?.data]
  );

  useEffect(() => {
    if (selectedMark === '') return;
    setTableData([
      ['Seller Name', props?.data[Number(selectedMark)][12]],
      ['Sale Amount', props?.data[Number(selectedMark)][11]],
      ['Recording Date', props?.data[Number(selectedMark)][0]],
      ['Sale Date', props?.data[Number(selectedMark)][10]],
      ['Address', props?.data[Number(selectedMark)][4]],
      ['City', props?.data[Number(selectedMark)][5]],
      ['Zip', props?.data[Number(selectedMark)][6]],
      ['Bedrooms', props?.data[Number(selectedMark)][13]],
      ['Bathrooms', props?.data[Number(selectedMark)][14]],
    ]);
  }, [selectedMark]);

  useEffect(() => {
    setSelectedMark('');
    setTableData([]);
  }, [props?.data]);

  return (
    <div className='flex space-x-3'>
      <div className='relative w-full'>
        <MapBoxBuyerView
          mapId={'buyerMapBox'}
          mapData={getMapViewData}
          height={'!h-[400px] !rounded-xl'}
          callback={(index: string) => setSelectedMark(index)}
        />
        {props?.loading && <Loading />}
        {selectedMark !== '' && props?.data?.[Number(selectedMark)] && (
          <div className='rad absolute right-[75px] top-1 z-[1000] w-[400px] overflow-hidden rounded-md bg-white'>
            <div
              className='flex items-center justify-between'
              color='secondary'
              onClick={() => setSelectedMark('')}
            >
              <IconButton>
                <svg
                  aria-hidden='true'
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </IconButton>
            </div>
            <Table
              maxHeight='260px'
              header={header}
              body={tableData}
              loading={false}
              onlyContent
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPanel;

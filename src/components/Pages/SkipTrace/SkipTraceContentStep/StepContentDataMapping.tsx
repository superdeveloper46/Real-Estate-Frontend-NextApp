import { MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

import Button from '@/components/Button/Button.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';
import { setGlobalLoading, setNotification } from '@/redux/slices/global';
import { setDestinations, setImportStep } from '@/redux/slices/skipTrace';
import { dispatch, useSelector } from '@/redux/store';
import { createEpxortFile } from '@/utils/api/restful/skiptrace';

import styles from '../style.module.scss';
import RadioTab from './RadioTab.component';

const selectList = [
  'Do not import',
  'Property Address',
  'Property City',
  'Property State',
  'Property Zip',
  'First Name',
  'Last Name',
];

const SelectProperty = (props: { index: number }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const openAnchor = Boolean(anchor);
  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const { destinations } = useSelector((state: any) => state.skipTrace);

  return (
    <div>
      <Button
        text={destinations[props?.index] ?? 'Do not import'}
        textClass='w-24 text-left'
        classes={
          destinations[props?.index] === undefined ||
          destinations[props?.index] === 'Do not import'
            ? 'rounded-[6px] border !bg-sfra-gray-300 !h-8 group !py-1 !px-2 hover:!bg-white hover:text-sfra-gray-300 hover:border-sfra-gray-300'
            : 'rounded-[6px] border !h-8 group !py-1 !px-2 hover:!bg-white hover:text-sfra-blue-100 hover:border-sfra-blue-100'
        }
        startIcon={
          <img
            src={
              destinations[props?.index] === undefined ||
              destinations[props?.index] === 'Do not import'
                ? '/assets/images/skiptrace/warnning.svg'
                : '/assets/images/skiptrace/check.svg'
            }
            alt='check icon'
            className={
              destinations[props?.index] === undefined ||
              destinations[props?.index] === 'Do not import'
                ? 'gray-svg'
                : 'blue-svg'
            }
          />
        }
        endIcon={
          <img
            src='/assets/images/skiptrace/down.svg'
            alt='check icon'
            className={`${
              destinations[props?.index] === undefined ||
              destinations[props?.index] === 'Do not import'
                ? 'gray-svg'
                : 'blue-svg'
            } ml-4`}
          />
        }
        onClick={(event) => handleAnchorClick(event)}
      />
      <StyledMenu
        anchorEl={anchor}
        open={openAnchor}
        onClose={handleClose}
        disableScrollLock={true}
        minWidth={1}
        borderRadius={10}
      >
        <div className='px-2'>
          {selectList.map((item, index) => (
            <MenuItem
              key={index}
              style={{
                fontSize: '0.8125rem',
                paddingTop: '0.2rem',
                paddingBottom: '0.2rem',
              }}
              disableRipple
              onClick={() => {
                if (destinations.indexOf(item) !== -1) {
                  dispatch(
                    setNotification({
                      notiType: 'warning',
                      notification:
                        'Already you selected this field. You should select other one.',
                    })
                  );
                  handleClose();
                  return;
                }
                const data = { index: props?.index, value: item };
                dispatch(setDestinations(data as any));
                handleClose();
              }}
            >
              {item}
            </MenuItem>
          ))}
        </div>
      </StyledMenu>
    </div>
  );
};

const SourceFieldItem = (props: { title: string; index: number }) => (
  <div
    className={`flex cursor-pointer items-center justify-between rounded border bg-sfra-blue-10 py-1 px-2`}
  >
    <div className='font-montserrat text-xs text-sfra-gray-200'>
      {props?.title}
    </div>
    <div>
      <SelectProperty index={props?.index} />
    </div>
  </div>
);

const StepContentDataMapping = () => {
  const { importStep, uploadedFileName, sheets, headers } = useSelector(
    (state: any) => state.skipTrace
  );
  const [selectedWorksheet, setSelectedWorksheet] = useState(0);
  const { destinations } = useSelector((state: any) => state.skipTrace);

  return (
    <div className={`${styles.content} space-y-8`}>
      <div className='flex rounded-[10px] bg-sfra-gray-400 p-2.5 font-montserrat text-xs text-white'>
        <img
          src='/assets/images/skiptrace/info.svg'
          className='mr-1.5'
          alt='info icon'
        />
        {`It is required to have the mapping for Property Address, Property City, Property State and Property Zip`}
      </div>

      <div className='flex justify-between space-x-5'>
        <div className='w-72'>
          <div className='font-montserrat text-xs text-sfra-gray-200'>
            SELECT SPREADSHEET TAB
          </div>
          <div className='mt-3 space-y-4'>
            {sheets?.map((item: string, index: number) => (
              <RadioTab
                key={index}
                title={item}
                url={'/assets/images/skiptrace/worksheet.svg'}
                selected={selectedWorksheet === index}
                setSelectedTab={() => setSelectedWorksheet(index)}
              />
            ))}
          </div>
        </div>

        <div className='w-[calc(100%-19.25rem)]'>
          <div className='font-montserrat text-xs text-sfra-gray-200'>
            SOURCE FIELDS
          </div>
          <div className='mt-3 space-y-4'>
            {headers[selectedWorksheet]?.map((item: string, index: number) => (
              <SourceFieldItem key={index} title={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className='flex justify-end space-x-5'>
        <Button
          text='Back'
          classes='rounded-[10px] border !bg-white !h-9 group !px-20 hover:!bg-white !text-sfra-pink-100 !border-sfra-pink-100 hover:!bg-sfra-gray-50'
          onClick={() => {
            dispatch(setImportStep((Number(importStep) - 1) as any));
          }}
        />
        <Button
          text='Next'
          classes='rounded-[10px] border !bg-sfra-pink-100 !h-9 group !px-20 hover:!bg-white hover:text-sfra-pink-100 hover:border-sfra-pink-100'
          onClick={() => {
            if (
              destinations.indexOf('First Name') === -1 ||
              destinations.indexOf('Last Name') === -1 ||
              destinations.indexOf('Property Zip') === -1
            ) {
              dispatch(
                setNotification({
                  notiType: 'warning',
                  notification:
                    'Please select First Name, Last Name and Property zip.',
                })
              );
              return;
            }
            const dest = {
              firstName:
                headers[selectedWorksheet][destinations.indexOf('First Name')],
              lastName:
                headers[selectedWorksheet][destinations.indexOf('Last Name')],
              zipCode:
                headers[selectedWorksheet][
                  destinations.indexOf('Property Zip')
                ],
            };
            dispatch(setGlobalLoading(true));
            createEpxortFile({ fileName: uploadedFileName, dest }).then(
              (data) => {
                dispatch(setGlobalLoading(false));
                if (data.result === 'success') {
                  dispatch(setImportStep(importStep + 1));
                }
              }
            );
          }}
        />
      </div>
    </div>
  );
};

export default StepContentDataMapping;

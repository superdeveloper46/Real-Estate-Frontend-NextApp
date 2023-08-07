import React from 'react';
import {
  BsCheck2Square,
  BsCloudArrowUp,
  BsFileEarmarkMedical,
  BsMegaphone,
} from 'react-icons/bs';

import Button from '@/components/Button/Button.component';
import { useSelector } from '@/redux/store';

const ActionPanel = () => {
  const { selectedList } = useSelector((state: any) => state.myLists);
  return (
    <div className='flex items-center justify-between border py-3 px-4'>
      <div className='font-montserrat text-lg font-semibold text-sfra-pink-100'>
        {selectedList?.totalCount}&nbsp;
        <span className='text-sm font-medium text-sfra-gray-300'>listings</span>
      </div>
      <div className='flex space-x-2'>
        <Button
          text='Import List'
          variant='filled'
          classes='rounded-2xl'
          textClass={'font-semibold'}
          endIcon={<BsCloudArrowUp size={14} />}
          onClick={() => {}}
        />
        <Button
          text='Export List'
          variant='filled'
          classes='rounded-2xl'
          textClass={'font-semibold'}
          endIcon={<BsFileEarmarkMedical size={14} />}
          onClick={() => {}}
        />
        <Button
          text='Actions'
          variant='filled'
          classes='rounded-2xl'
          textClass={'font-semibold'}
          endIcon={<BsCheck2Square size={14} />}
          onClick={() => {}}
        />
        <Button
          text='New Campaign'
          variant='filled'
          classes='rounded-2xl'
          textClass={'font-semibold'}
          endIcon={<BsMegaphone size={14} />}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ActionPanel;

import { useState } from 'react';

import Button from '@/components/Button/Button.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';
import { useSelector } from '@/redux/store';

import MenuItem from '../MenuItem.component';

const MoveToListFooter = () => {
  const { myLists } = useSelector((state: any) => state.listBuilder);
  const [selectedList, setSelectedList] = useState(-1);
  const [existingLists, setOpenExistingLists] = useState<null | HTMLElement>(
    null
  );
  const openExistingLists = Boolean(existingLists);
  const handleExistingListsClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenExistingLists(event.currentTarget);
  };
  return (
    <div className='flex items-center justify-between space-x-6'>
      <Button
        classes='rounded-3xl w-60 !justify-between bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.21)]'
        variant='filled'
        onClick={handleExistingListsClick}
        textClass={'font-normal font-montserrat text-sfra-gray-400'}
        text={
          selectedList === -1
            ? 'Select from existing lists'
            : myLists[selectedList].listName
        }
        endIcon={
          <img
            src={
              !openExistingLists
                ? '/assets/images/listBuilder/arrow-bottom.svg'
                : '/assets/images/listBuilder/arrow-top.svg'
            }
            className='default-black-svg'
            alt='list builder bottom image'
          />
        }
      />
      <StyledMenu
        anchorEl={existingLists}
        open={openExistingLists}
        onClose={() => setOpenExistingLists(null)}
        disableScrollLock={true}
      >
        <div className='px-4'>
          {myLists?.map((item: any, index: number) => (
            <MenuItem
              key={index}
              text={item.listName}
              onClick={() => {
                setSelectedList(index);
                setOpenExistingLists(null);
              }}
              active={selectedList === index ? 'menu-active' : ''}
            />
          ))}
        </div>
      </StyledMenu>
      <Button
        text='Move to'
        onClick={() => {}}
        classes='rounded-3xl group w-32 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
        startIcon={
          <img
            src='/assets/images/listBuilder/moveTo.svg'
            alt='notViewProfile icon'
            className='default-white-svg blue-svg h-5'
          />
        }
      />
    </div>
  );
};

export default MoveToListFooter;

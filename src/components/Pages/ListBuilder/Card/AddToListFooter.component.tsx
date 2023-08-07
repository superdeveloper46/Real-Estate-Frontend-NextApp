import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';
import { setGlobalLoading, setNotification } from '@/redux/slices/global';
import { setMyLists } from '@/redux/slices/myLists';
import { dispatch } from '@/redux/store';
import { addToList, getMyLists } from '@/utils/api/restful/myLists';

import CreateList from '../../MyList/CreateList';
import MenuItem from '../MenuItem.component';

type AddToListFooterProps = {
  setOpenAddToList: (value: boolean) => void;
  id: number;
};

const AddToListFooter = (props: AddToListFooterProps) => {
  const { myLists } = useSelector((state: any) => state.myLists);
  const [selectedList, setSelectedList] = useState(-1);
  const [existingLists, setOpenExistingLists] = useState<null | HTMLElement>(
    null
  );
  const openExistingLists = Boolean(existingLists);
  const handleExistingListsClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpenExistingLists(event.currentTarget);
  };

  const [openAddList, setOpenAddList] = useState(false);
  return (
    <div>
      <div className='flex h-11 items-center justify-between space-x-4'>
        <Button
          classes='rounded-3xl w-60 !justify-between !h-8 bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.21)]'
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
          minWidth={240}
          maxHeight={200}
          borderRadius={10}
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
          text='Add to list'
          onClick={() => {
            if (selectedList === -1) {
              dispatch(
                setNotification({
                  notiType: 'warning',
                  notification: 'Please select a list.',
                })
              );
              return;
            }
            dispatch(setGlobalLoading(true));
            addToList({
              listId: myLists[selectedList].id,
              propertyId: props.id,
            })
              .then((resData) => {
                if (resData.result === 'success') {
                  dispatch(setGlobalLoading(false));
                  dispatch(
                    setNotification({
                      notiType: 'success',
                      notification: 'Successfully created.',
                    })
                  );
                  props?.setOpenAddToList(false);
                }
              })
              .catch(() => {
                dispatch(setGlobalLoading(false));
                dispatch(
                  setNotification({
                    notiType: 'danger',
                    notification: 'Error occured.',
                  })
                );
              });
          }}
          classes='rounded-3xl group w-32 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
          startIcon={
            <img
              src='/assets/images/listBuilder/makeNewList.svg'
              alt='addTolist icon'
              className='blue-svg !h-4'
            />
          }
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='my-4 w-2/5 border-b'></div>
        <div className='my-1.5 flex w-1/5 justify-center font-montserrat text-xs font-normal text-sfra-gray-400'>
          Or
        </div>
        <div className='my-4 w-2/5 border-b'></div>
      </div>
      <div className='flex justify-end'>
        <Button
          text='Create a new list'
          onClick={() => {
            setOpenAddList(true);
          }}
          classes='rounded-xl group !bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.21)] !text-sfra-blue-100 hover:!bg-sfra-blue-100 hover:!text-white'
          startIcon={
            <img
              src='/assets/images/listBuilder/newList.svg'
              alt='createNewList icon'
              className='white-svg h-3'
            />
          }
        />
      </div>
      <Dialog
        icon='/assets/images/listBuilder/makeList.svg'
        title={'Add a new List'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenAddList(false)}
        body={
          <CreateList
            setOpenAddList={setOpenAddList}
            callBack={() => {
              getMyLists({
                searchKey: '',
                sort: 0,
                from: 1,
                size: 10000,
              }).then((data: any) => {
                dispatch(setMyLists(data));
              });
            }}
          />
        }
        open={openAddList}
      />
    </div>
  );
};

export default AddToListFooter;

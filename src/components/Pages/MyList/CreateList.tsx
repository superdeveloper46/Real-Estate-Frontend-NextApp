import React, { useState } from 'react';

import Button from '@/components/Button/Button.component';
import { setGlobalLoading, setNotification } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';
import { makeList } from '@/utils/api/restful/myLists';

type CreateListProps = {
  setOpenAddList: (val: boolean) => void;
  callBack?: () => void;
};

const CreateList = (props: CreateListProps) => {
  const [listName, setListName] = useState('');
  return (
    <div className='space-y-3'>
      <div className='space-y-1.5'>
        <div className='font-montserrat text-xs text-sfra-gray-200'>
          &nbsp;List Name:
        </div>
        <div>
          <input
            type='text'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className='h-8 w-72 rounded-md border px-2 font-montserrat text-xs text-sfra-gray-300 outline-none'
          />
        </div>
      </div>

      <div className='float-right !-mb-6 flex h-11 w-60 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-blue-100'
          classes='!bg-white color'
          onClick={() => {
            props?.setOpenAddList(false);
          }}
        />
        <Button
          text='Create'
          onClick={() => {
            if (listName === '') {
              dispatch(
                setNotification({
                  notiType: 'warning',
                  notification: "ListName can't be empty.",
                })
              );
            } else {
              const listData = {
                listName,
                dmi: false,
                totalCount: 0,
                newCount: 0,
                filters: [],
                options: [],
              };
              dispatch(setGlobalLoading(true));
              props?.setOpenAddList(false);
              makeList(listData)
                .then((resData) => {
                  if (resData.result === 'success') {
                    dispatch(setGlobalLoading(false));
                    dispatch(
                      setNotification({
                        notiType: 'success',
                        notification: 'Successfully saved.',
                      })
                    );

                    if (props?.callBack) {
                      props?.callBack();
                    }
                  } else {
                    dispatch(
                      setNotification({
                        notiType: 'danger',
                        notification: 'Error occurred.',
                      })
                    );
                    dispatch(setGlobalLoading(false));
                  }
                })
                .catch(() => {
                  dispatch(setGlobalLoading(false));
                });
            }
          }}
          classes='rounded-3xl px-10 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
        />
      </div>
    </div>
  );
};

export default CreateList;

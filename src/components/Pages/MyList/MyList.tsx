import React, { useEffect, useState } from 'react';

import { setGlobalLoading, setNotification } from '@/redux/slices/global';
import { dispatch, useSelector } from '@/redux/store';
import { getMyListsByListName } from '@/utils/api/restful/myLists';

import ActionPanel from './ActionPanel';
import CategoryPanel from './CategoryPanel';
import ListPanel from './ListPanel';
import MapBoxPanel from './MapBoxPanel';
import TablePanel from './TablePanel';

const MyList = () => {
  const { selectedList } = useSelector((state: any) => state.myLists);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedList.id === undefined) {
      setData([]);
      return;
    }
    dispatch(setGlobalLoading(true));
    getMyListsByListName({ listId: selectedList.id })
      .then((resData) => {
        setData(resData);
        dispatch(setGlobalLoading(false));
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
  }, [selectedList]);

  return (
    <div className='flex h-[calc(100vh-40px)]'>
      <ListPanel />
      <div className='min-w-[calc(100vw-16rem)] overflow-auto'>
        <CategoryPanel />
        <ActionPanel />
        <MapBoxPanel data={data} />
        <TablePanel data={data} />
      </div>
    </div>
  );
};

export default MyList;

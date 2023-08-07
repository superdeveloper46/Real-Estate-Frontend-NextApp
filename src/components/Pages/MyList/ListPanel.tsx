import React, { useEffect, useState } from 'react';
import {
  BsCaretDownFill,
  BsFilter,
  BsPlus,
  BsSearch,
  BsTrash,
} from 'react-icons/bs';

import Dialog from '@/components/Dialog/Dialog.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';
import { setGlobalLoading } from '@/redux/slices/global';
import { setSelectedList } from '@/redux/slices/myLists';
import { dispatch } from '@/redux/store';
import { deleteMyList } from '@/utils/api/restful/listbuilder';
import { getMyLists } from '@/utils/api/restful/myLists';
import useDebounce from '@/utils/hooks/useDebounce';

import MenuItem from '../ListBuilder/MenuItem.component';
import CreateList from './CreateList';
import styles from './style.module.scss';

const ListPanel = () => {
  const [search, setSearch] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [sort, setSort] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState(0);
  const [list, setList] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [openAddList, setOpenAddList] = useState(false);

  const sortTextList = [
    'LAST VIEWED',
    'LARGEST TO SMALLEST',
    'SMALLEST TO LARGEST',
    'NEWEST FIRST',
    'OLDEST FIRST',
  ];

  const debounce = useDebounce(searchKey, 500);

  const fetchData = () => {
    dispatch(setGlobalLoading(true));
    getMyLists({
      searchKey,
      sort: selectedSort,
      from: 1,
      size: 10000,
    })
      .then((data: any) => {
        setList(data);
        dispatch(setGlobalLoading(false));
        dispatch(setSelectedList(data[selectedListIndex]));
      })
      .catch(() => {
        dispatch(setGlobalLoading(false));
      });
  };

  useEffect(() => {
    fetchData();
  }, [debounce, searchKey]);

  const openSort = Boolean(sort);
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSort(event.currentTarget);
  };

  const handleClose = () => {
    setSort(null);
  };

  const handleSelectList = (index: number) => {
    setSelectedListIndex(index);
    dispatch(setSelectedList(list[index]));
  };

  return (
    <div className='h-full w-64 min-w-[16rem] border'>
      <div className={styles.myPropertiesTitle}>My Properties</div>
      <div className={styles.myListsHeader}>
        <div className='flex items-center'>
          <BsCaretDownFill className='mr-[3px] mt-[1px]' size={14} />
          My Lists
        </div>
        <div className='flex items-center space-x-1'>
          <BsSearch
            onClick={() => setSearch(!search)}
            className={`${styles.actionIcon} ${
              search ? 'text-sfra-blue-600' : ''
            } mr-1`}
            size={12}
          />
          <BsFilter
            onClick={(event: any) => handleSortClick(event)}
            className={`${styles.actionIcon} mt-[2px]`}
            size={17}
          />
          <StyledMenu
            anchorEl={sort}
            open={openSort}
            onClose={handleClose}
            disableScrollLock={true}
            minWidth={1}
            borderRadius={5}
          >
            <div className='px-2'>
              {sortTextList.map((item, index) => (
                <MenuItem
                  key={index}
                  text={item}
                  classes='!text-sxs'
                  onClick={() => {
                    handleClose();
                    setSelectedSort(index);
                  }}
                  active={selectedSort === index ? 'menu-active' : ''}
                />
              ))}
            </div>
          </StyledMenu>
          <BsPlus
            className={`${styles.actionIcon}`}
            size={20}
            onClick={() => setOpenAddList(true)}
          />
          <Dialog
            icon='/assets/images/listBuilder/makeList.svg'
            title={'Add a new List'}
            classes='!bg-sfra-blue-300 !text-white'
            closeDialog={() => setOpenAddList(false)}
            body={
              <CreateList
                setOpenAddList={setOpenAddList}
                callBack={fetchData}
              />
            }
            open={openAddList}
          />
        </div>
      </div>
      <div className='overflow-auto'>
        {search && (
          <div className='flex items-center border-b-[1px] py-2 px-3'>
            <div className='flex w-full rounded-[10px] border bg-sfra-gray-50 px-2'>
              <div className='w-[calc(100%-22px)] rounded-l-[10px]'>
                <input
                  type='text'
                  onChange={(e) => {
                    setSearchKey(e.target.value);
                  }}
                  value={searchKey}
                  placeholder='Search List by ListName'
                  className='w-full rounded-l-[10px] border-none bg-transparent p-1.5 text-xs font-normal text-sfra-gray-300 outline-none'
                />
              </div>
              <div className='flex items-center rounded-r-[10px] bg-transparent p-1.5'>
                <img
                  src='/assets/images/listBuilder/search.svg'
                  alt='search icon'
                  className='h-3'
                />
              </div>
            </div>
          </div>
        )}
        {list.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`${styles.listItem} ${
                selectedListIndex === index ? 'bg-sfra-blue-100/20' : ''
              }`}
              onClick={() => handleSelectList(index)}
            >
              <div>
                {item.listName} ({item.totalCount})
              </div>
              {selectedListIndex === index && (
                <div className='rounded-full p-1 hover:bg-sfra-gray-200/20'>
                  <BsTrash
                    className='text-sfra-pink-100'
                    onClick={() => {
                      dispatch(setGlobalLoading(true));
                      deleteMyList({ id: item.id })
                        .then((resData) => {
                          if (resData.result === 'success') fetchData();
                          else dispatch(setGlobalLoading(false));
                        })
                        .catch(() => {
                          dispatch(setGlobalLoading(false));
                        });
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListPanel;

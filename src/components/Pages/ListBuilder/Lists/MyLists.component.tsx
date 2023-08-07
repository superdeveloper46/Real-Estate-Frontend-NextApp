import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Button from '@/components/Button/Button.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';
import {
  deleteMyList,
  getMyListTotalCount,
} from '@/utils/api/restful/listbuilder';
import { getMyLists } from '@/utils/api/restful/myLists';
import useDebounce from '@/utils/hooks/useDebounce';

import MenuItem from '../MenuItem.component';
import ListItem from './ListItem.component';
import ListLoader from './ListLoader';

const MyLists = () => {
  const pagePerCount = 12;
  const [sort, setSort] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [cardData, setCardData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const debounce = useDebounce(searchKey, 500);

  const openSort = Boolean(sort);
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSort(event.currentTarget);
  };

  useEffect(() => {
    getMyListTotalCount({ searchKey }).then((data) =>
      setTotalCount(data.result)
    );
  }, [debounce]);

  useEffect(() => {
    setPageIndex(1);
    setHasMore(true);
    setLoading(true);
    getMyLists({
      searchKey,
      sort: selectedSort,
      from: 1,
      size: pagePerCount,
    }).then((data: any) => {
      setLoading(false);
      setCardData(data);
    });
  }, [debounce, selectedSort]);

  const handleClose = () => {
    setSort(null);
  };

  const sortTextList = [
    'LAST VIEWED',
    'LARGEST TO SMALLEST',
    'SMALLEST TO LARGEST',
    'NEWEST FIRST',
    'OLDEST FIRST',
  ];

  const fetchMoreData = async () => {
    if (cardData.length >= totalCount) {
      setHasMore(false);
      return;
    }

    if (totalCount > pageIndex * pagePerCount) {
      const data = await getMyLists({
        searchKey,
        sort: selectedSort,
        from: pageIndex + 1,
        size: pagePerCount,
      });
      setCardData(cardData.concat(data));
      setPageIndex(Number(pageIndex + 1));
    }
  };

  const handleDeleteRow = (id: string) => {
    const rows = cardData.filter((row: any) => row.id !== id);
    setCardData(rows);
    setTotalCount(totalCount - 1);
    if (cardData.length >= totalCount - 1) setHasMore(false);
    deleteMyList({ id });
  };

  const handleEditRow = (id: string, data: any) => {
    const rows: any = cardData.map((row: any) => {
      if (row.id === id) {
        return { ...data };
      }
      return row;
    });
    setCardData(rows);
  };

  return (
    <div className='p-5'>
      <div className='font-montserrat text-base font-medium text-sfra-purple-100'>{`${totalCount} Lists created`}</div>
      <div className='flex justify-end'>
        <Button
          startIcon={
            <img
              src='/assets/images/listBuilder/makeNewList.svg'
              alt='make new list icon'
              className='h-4'
            />
          }
          text='Make New List'
          classes='rounded-3xl'
        />
      </div>
      <div>
        <div className='mt-4 mb-2 flex items-center justify-between'>
          <div className='flex w-80 rounded-[10px] border bg-sfra-gray-50 px-2'>
            <div className='w-[calc(100%-22px)] rounded-l-[10px]'>
              <input
                type='text'
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                placeholder='Search List...'
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

          <div className='flex'>
            <div className='flex items-center'>
              <img
                src='/assets/images/listBuilder/listSort.svg'
                alt='sort icon'
              />
              <span className='font-montserrat text-xs font-normal text-sfra-gray-300'>
                SORT:
              </span>
            </div>
            <div>
              <Button
                classes='bg-white w-56 !justify-end'
                variant='filled'
                onClick={handleSortClick}
                textClass='!font-montserrat !text-xs !font-normal !text-sfra-gray-300'
                text={sortTextList[selectedSort]}
                endIcon={
                  <img
                    src={
                      !openSort
                        ? '/assets/images/listBuilder/listArrowBottom.svg'
                        : '/assets/images/listBuilder/listArrowTop.svg'
                    }
                    className='h-6 w-6'
                    alt='list builder arrow icon'
                  />
                }
              />
              <StyledMenu
                anchorEl={sort}
                open={openSort}
                onClose={handleClose}
                disableScrollLock={true}
                minWidth={1}
                borderRadius={10}
              >
                <div className='px-2'>
                  {sortTextList.map((item, index) => (
                    <MenuItem
                      key={index}
                      text={item}
                      onClick={() => {
                        handleClose();
                        setSelectedSort(index);
                      }}
                      active={selectedSort === index ? 'menu-active' : ''}
                    />
                  ))}
                </div>
              </StyledMenu>
            </div>
          </div>
        </div>

        <div className='min-h-[100vh] rounded-lg bg-sfra-blue-10 p-3'>
          <InfiniteScroll
            className={
              'grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
            }
            dataLength={(pageIndex - 1) * pagePerCount}
            pullDownToRefreshThreshold={totalCount}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollThreshold={1}
            loader={
              <>
                {Array.apply('', new Array(pagePerCount)).map((item, index) => {
                  return cardData.length !== 0 ? (
                    <ListLoader key={index} />
                  ) : (
                    <></>
                  );
                })}
              </>
            }
          >
            {loading
              ? Array.apply('', new Array(pagePerCount)).map((item, index) => {
                  return <ListLoader key={index} />;
                })
              : cardData?.map((item: any, index: number) => {
                  return (
                    <ListItem
                      key={index}
                      {...item}
                      handleDeleteRow={handleDeleteRow}
                      handleEditRow={handleEditRow}
                    />
                  );
                })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default MyLists;

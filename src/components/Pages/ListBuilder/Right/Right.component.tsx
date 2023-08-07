import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Router from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import ImageIcon from '@/components/ImageIcon/ImageIcon';
import MapBoxClusterView from '@/components/MapBoxView/MapBoxClusterView.component';
import MenuItem from '@/components/Pages/ListBuilder/MenuItem.component';
import SearchFilter from '@/components/SearchFilter/SearchFilter.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';
import Table from '@/components/Table/Table.component';
import { setGlobalLoading, setNotification } from '@/redux/slices/global';
import { setMyLists } from '@/redux/slices/myLists';
import {
  getOptions,
  getPropertyListDataFromElasticsearch,
} from '@/utils/api/restful/listbuilder';
import { getMyLists, makeList } from '@/utils/api/restful/myLists';

import {
  setMapPosition,
  setPropertyListsMap,
  setPropertyListsTable,
  setTablePageIndex,
  setViewType,
} from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import Card from '../Card/Card.component';
import CardLoader from '../Card/CardLoader.component';
import MakeaList from '../Lists/MakeaList.component';

const propertyListTableHeader = [
  { title: 'TYPE', sort: false },
  { title: 'ADDRESS', sort: false },
  { title: 'CITY', sort: false },
  { title: 'SQFT', sort: true },
  { title: 'BEDS', sort: true },
  { title: 'BATHS', sort: true },
  { title: 'EST VALUE', sort: true },
  { title: 'EST EQUITY', sort: true },
];

const MenuItemChildren = () => {
  return (
    <div className='flex items-center px-3'>
      <ImageIcon
        src={'/assets/images/listBuilder/comming-soon.svg'}
        alt='menu item icon'
        classes='mr-1.5 !h-4'
      />
      <div className='whitespace-nowrap font-montserrat text-sxs font-medium text-sfra-blue-100'>
        COMMING SOON
      </div>
    </div>
  );
};

const PropertyTypeIcon = (props: { data: string }) => (
  <Tooltip
    title={props?.data}
    placement='right'
    componentsProps={{
      tooltip: {
        sx: {
          color: '#7E7E8A',
          backgroundColor: 'white',
          fontSize: '12px',
          fontFamily: 'Montserrat',
          fontWeight: '300',
          padding: '8px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.21)',
        },
      },
    }}
  >
    <img
      src={`/assets/images/listBuilder/${
        props?.data.search(' Residential') !== -1
          ? 'table-1'
          : props?.data.search('Commercial') !== -1
          ? 'table-2'
          : props?.data.search('Land') !== -1
          ? 'table-4'
          : 'table-3'
      }.svg`}
      alt='filter-icon'
      className={`h-5 ${
        props?.data.search(' Residential') !== -1
          ? 'blue-svg'
          : props?.data.search('Commercial') !== -1
          ? 'darkBlue-svg'
          : props?.data.search('Land') !== -1
          ? 'green-svg'
          : 'pink-svg'
      } cursor-pointer`}
    />
  </Tooltip>
);

const Right = () => {
  const tablePagePerCount = 10;
  const cardPagePerCount = 10;
  const mapPagePerCount = 10000;

  const { mapRef, tablePageIndex, mapZoom, longitude, latitude } = useSelector(
    (state: any) => state.listBuilder
  );

  const [cardPageIndex, setCardPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const viewTypes = [
    { text: 'Split View', url: 'split-view.svg', viewType: 1 },
    { text: 'Map View', url: 'map-view.svg', viewType: 0 },
    { text: 'List View', url: 'list-view.svg', viewType: 2 },
    { text: 'Card View', url: 'card-view.svg', viewType: 3 },
  ];

  const [actions, setActions] = useState<null | HTMLElement>(null);
  const [split, setSplit] = useState<null | HTMLElement>(null);
  const openActions = Boolean(actions);
  const openSplit = Boolean(split);
  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setActions(event.currentTarget);
  };
  const handleSplitClick = (event: React.MouseEvent<HTMLElement>) => {
    setSplit(event.currentTarget);
  };
  const handleClose = () => {
    setActions(null);
    setSplit(null);
  };

  const [openMakeList, setOpenMakeList] = useState(false);

  const handleOpenMakeList = () => {
    setOpenMakeList(true);
  };

  const {
    realFilters,
    filterLists,
    propertyListsMap,
    propertyListsTable,
    toggleFilters,
    viewType,
  } = useSelector((state: any) => state.listBuilder);

  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState([]);

  const handleSkipTrace = () => {
    Router.push('/skiptrace');
    handleClose();
  };

  const sortArr = [
    'property_type',
    'situsfullstreetaddress',
    'situscity',
    'sumbuildingsqft',
    'bedrooms',
    'bathtotalcalc',
    'currentavmvalue',
    'equity',

    // 'situszip5',
    // 'county',
    // 'msa',
    // 'schooldistrictname',
    // 'property_classification',
    // 'lotsizesqft',
    // 'yearbuilt',
    // 'num_stories',
    // 'hoa1name',
    // 'pool',
    // 'atticsqft',
    // 'garage',
    // 'basement',
    // 'situsunitnbr',
    // 'owner_type',
    // 'years_owned',
    // 'sales_date',
    // 'currentsalesprice',
    // 'owneroccupied',
    // 'owner1corpind',
    // 'owner1ownershiprights',
    // 'ownername1full',
    // 'vacantflag',
    // 'sfr_cnt',
    // 'count',
    // 'HomesteadInd',
    // 'VeteranInd',
    // 'DisabledInd',
    // 'WidowInd',
    // 'SeniorInd',
    // 'SchoolCollegeInd',
    // 'ReligiousInd',
    // 'WelfareInd',
    // 'PublicUtilityInd',
    // 'CemeteryInd',
    // 'HospitalInd',
    // 'LibraryInd',
    // 'absentee_owner_location',
    // 'bank_owned',
    // 'vacantflagdate',
    // 'totalopenlienamt',

    // 'assdtotalvalue',
    // 'pfcflag',
    // 'pfcindicator',
    // 'pfc_status',
    // 'pfcrecordingdate',
    // 'pfcreleasereason',
    // 'listedflagdate',
    // 'islistedflag',
    // 'islistedpricerange',
    // 'loan_type',
    // 'totalopenliennbr',
    // 'totalopenlienamt',
    // 'mtg1type',
    // 'mtg2type',
    // 'mtg3type',
    // 'mtg4type',
    // 'mtg1typefinancing',
    // 'mtg2typefinancing',
    // 'mtg3typefinancing',
    // 'mtg4typefinancing',
    // 'mtg1_ir',
    // 'mtg2_ir',
    // 'mtg3_ir',
    // 'mtg4_ir',
    // 'cash_buyer',
    // 'owned_free_clear',
    // 'firstmtgsellercarrybackflag',
  ];

  const mapViewFilelds = [
    'propertyid',
    'situslongitude',
    'situslatitude',
    'situsfullstreetaddress',
    'situscity',
    'situszip5',
    'property_type',
    'ownername1full',
  ];

  const filterOptions = {
    ...realFilters.locationFilters,
    ...realFilters.propertyCharcFilters,
    ...realFilters.ownerInfoDgFilters,
    ...realFilters.valuationEquityInfoFilters,
    ...realFilters.preForeclosureReosFilters,
    ...realFilters.mlsStatusFilters,
    ...realFilters.mortgageInfoFilters,
  };

  const getSearchOption = (
    _source: Array<string>,
    from: number,
    size: number
  ) => {
    return {
      _source,
      filterOptions,
      from,
      size,
    };
  };

  const tableData = propertyListsTable?.map((item: any) => {
    let obj = {};
    sortArr.forEach((k) => {
      obj = { ...obj, [k]: item[k] };
    });
    const data = Object.values(obj);
    data[0] = <PropertyTypeIcon data={data[0] as string} />;
    return data;
  });

  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    if (cardData.length >= totalCount) {
      setHasMore(false);
      return;
    }

    if (totalCount > cardPageIndex * cardPagePerCount) {
      const data = await getPropertyListDataFromElasticsearch(
        getSearchOption([], cardPageIndex * cardPagePerCount, cardPagePerCount)
      );
      setCardData(cardData.concat(data.result));
      setCardPageIndex(Number(cardPageIndex + 1));
    }
  };

  const initData = () => {
    const data: any = [];
    if (viewType === 0) {
      dispatch(setPropertyListsMap(data));
    } else if (viewType === 1) {
      dispatch(setPropertyListsMap(data));
      dispatch(setPropertyListsTable(data));
    } else if (viewType === 2) {
      dispatch(setPropertyListsTable(data));
    } else {
      setCardData([]);
    }
    if (totalCount !== 0) setTotalCount(0);
  };

  const moveToPosition = () => {
    setTimeout(() => {
      mapRef.easeTo({
        center: { lng: longitude, lat: latitude },
        zoom: mapZoom,
        duration: 1000,
      });
      setTimeout(() => {
        mapRef.fire('click', {
          lngLat: [longitude, latitude],
        });
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    if (filterLists.length === 0) {
      initData();
      return;
    }

    if (viewType === 3) {
      setCardPageIndex(1);
      setHasMore(true);
      setLoading(true);
      getPropertyListDataFromElasticsearch(
        getSearchOption([], 0, cardPagePerCount)
      ).then((data) => {
        if (totalCount !== data.totalCount) setTotalCount(data.totalCount);
        setCardData(data.result);
        setLoading(false);
      });
    }
  }, [viewType, realFilters]);

  useEffect(() => {
    if (filterLists.length === 0) {
      initData();
      return;
    }
    if (viewType === 1 || viewType === 2) {
      setLoading(true);
      getPropertyListDataFromElasticsearch(
        getSearchOption(
          [],
          tablePagePerCount * (tablePageIndex - 1),
          tablePagePerCount
        )
      ).then((data) => {
        if (totalCount !== data.totalCount) setTotalCount(data.totalCount);
        dispatch(setPropertyListsTable(data.result));
        setLoading(false);
      });
    }
  }, [realFilters, tablePageIndex]);

  useEffect(() => {
    if (mapRef === null) return;
    const data: any = {
      zoom: mapRef.getZoom(),
      longitude: mapRef.getCenter().lng,
      latitude: mapRef.getCenter().lat,
    };
    dispatch(setMapPosition(data));
  }, [viewType]);

  useEffect(() => {
    if (mapRef === null) return;
    mapRef.easeTo({
      center: { lng: -100.0, lat: 40.0 },
      zoom: 4,
    });
    dispatch(setTablePageIndex(1));

    if (filterLists.length === 0) {
      initData();
      return;
    }
    if (viewType === 0 || viewType === 1) {
      dispatch(setGlobalLoading(true));
      getPropertyListDataFromElasticsearch(
        getSearchOption(mapViewFilelds, 0, mapPagePerCount)
      ).then((resData) => {
        if (totalCount !== resData.totalCount)
          setTotalCount(resData.totalCount);
        dispatch(setPropertyListsMap(resData.result));
        dispatch(setGlobalLoading(false));
        moveToPosition();
      });
    }
  }, [realFilters]);

  const getMapViewData = useMemo(() => {
    const mapViewData: { type: string; features: any } = {
      type: 'FeatureCollection',
      features: [],
    };

    propertyListsMap?.forEach((dataPoint: any) => {
      const existingFeature: any = mapViewData.features.find((feature: any) => {
        return (
          feature.geometry.coordinates[0] === dataPoint.situslongitude &&
          feature.geometry.coordinates[1] === dataPoint.situslatitude
        );
      });

      if (existingFeature) {
        existingFeature.properties.count =
          Number(existingFeature.properties.count) + 1;
      } else {
        const newFeature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [dataPoint.situslongitude, dataPoint.situslatitude],
          },
          properties: {
            id: dataPoint.propertyid,
            address: dataPoint.situsfullstreetaddress,
            city: dataPoint.situscity,
            zip: dataPoint.situszip5,
            name: dataPoint.ownername1full,
            image:
              dataPoint?.property_type !== undefined &&
              dataPoint?.property_type !== null
                ? dataPoint?.property_type.search(' Residential') !== -1
                  ? 'img1'
                  : dataPoint?.property_type.search('Commercial') !== -1
                  ? 'img2'
                  : dataPoint?.property_type.search('Land') !== -1
                  ? 'img4'
                  : 'img3'
                : 'img2',
            count: 1,
          },
        };
        mapViewData.features.push(newFeature);
      }
    });

    return mapViewData;
  }, [propertyListsMap]);

  useMemo(() => {
    getMyLists({
      searchKey: '',
      sort: 0,
      from: 1,
      size: 10000,
    }).then((data: any) => {
      dispatch(setMyLists(data));
    });
  }, []);

  const [listName, onListNameChanged] = useState('');
  const [dmi, onDMIChanged] = useState(false);
  const [error, onError] = useState(false);

  const makeaList = async () => {
    const listData = {
      listName,
      dmi,
      totalCount,
      newCount: 2,
      filters: filterLists,
      options: {
        _source: [],
        query: {
          bool: {
            must: getOptions(filterOptions).filter(Boolean),
          },
        },
        from: 0,
        size: 1000,
      },
    };
    dispatch(setGlobalLoading(true));
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
        } else {
          dispatch(setGlobalLoading(false));
          dispatch(
            setNotification({
              notiType: 'danger',
              notification: 'Error occured',
            })
          );
        }
      })
      .catch(() => {
        dispatch(setGlobalLoading(false));
        dispatch(
          setNotification({ notiType: 'danger', notification: 'Error occured' })
        );
      });
  };

  const MakeListFooter = () => {
    return (
      <div className='flex h-11 w-80 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-blue-100'
          classes='!bg-white color'
          onClick={() => {
            setOpenMakeList(false);
          }}
        />
        <Button
          text='Create'
          onClick={() => {
            if (listName === '') {
              onError(true);
            } else {
              setOpenMakeList(false);
              makeaList();
              onError(false);
            }
          }}
          classes='rounded-3xl px-10 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
        />
      </div>
    );
  };

  return (
    <div className='grow'>
      <div className='mx-4 py-4'>
        <SearchFilter />
      </div>

      <div className='mx-4  flex items-center justify-between pb-4'>
        <div className='flex items-center'>
          <span className='mr-4 font-montserrat text-lg font-medium text-sfra-pink-100'>
            {totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </span>
          <span className='font-montserrat text-ms font-light text-sfra-gray-300'>
            Properties matched your criteria
          </span>
        </div>
        <div className='flex items-center space-x-3'>
          <div>
            <Button
              text='Make a List'
              variant='filled'
              classes='rounded-3xl'
              textClass={'font-semibold'}
              startIcon={
                <img
                  src='/assets/images/listBuilder/make-list.svg'
                  alt='list builder bottom image'
                  className='h-4'
                />
              }
              onClick={() => {
                onListNameChanged('');
                onDMIChanged(false);
                onError(false);
                handleOpenMakeList();
              }}
            />
            <Dialog
              icon='/assets/images/listBuilder/makeList.svg'
              title={'Make a List'}
              classes='!bg-sfra-blue-300 !text-white'
              closeDialog={() => setOpenMakeList(false)}
              body={
                <MakeaList
                  listName={listName}
                  dmi={dmi}
                  totalCount={totalCount}
                  error={error}
                  onListNameChanged={onListNameChanged}
                  onDMIChanged={onDMIChanged}
                  onError={onError}
                />
              }
              footer={<MakeListFooter />}
              open={openMakeList}
            />
          </div>

          <div>
            <Button
              classes='rounded-3xl w-40 bg-white shadow-lg shadow-[0px_0px_10px_rgba(0,0,0,0.21)]'
              variant='filled'
              onClick={handleActionClick}
              textClass={'text-sfra-blue-100 font-semibold'}
              startIcon={
                <img
                  src='/assets/images/listBuilder/actions.svg'
                  alt='list builder bottom image'
                  className='h-4'
                />
              }
              text='Actions'
              endIcon={
                <img
                  src={
                    !openActions
                      ? '/assets/images/listBuilder/arrow-bottom.svg'
                      : '/assets/images/listBuilder/arrow-top.svg'
                  }
                  alt='list builder bottom image'
                />
              }
            />
            <StyledMenu
              anchorEl={actions}
              open={openActions}
              onClose={handleClose}
              disableScrollLock={true}
            >
              <div className='px-4'>
                <MenuItem
                  text='Export List'
                  icon='/assets/images/listBuilder/export-list.svg'
                  onClick={() => handleClose()}
                />
                <MenuItem
                  text='Skip Trace'
                  icon='/assets/images/listBuilder/skip-trace.svg'
                  childrenNode={<MenuItemChildren />}
                  onClick={() => handleSkipTrace()}
                />
                <MenuItem
                  text='Mail List'
                  icon='/assets/images/listBuilder/mail-list.svg'
                  childrenNode={<MenuItemChildren />}
                  onClick={() => handleClose()}
                />
                <MenuItem
                  text='Generate Demographic Report'
                  icon='/assets/images/listBuilder/generate.svg'
                  childrenNode={<MenuItemChildren />}
                  onClick={() => handleClose()}
                />
              </div>
            </StyledMenu>
          </div>

          <div>
            <Button
              classes='rounded-3xl w-40 bg-white shadow-lg shadow-[0px_0px_10px_rgba(0,0,0,0.21)]'
              variant='filled'
              onClick={handleSplitClick}
              textClass={'text-sfra-blue-100 font-semibold'}
              startIcon={
                <img
                  src='/assets/images/listBuilder/split.svg'
                  alt='listBuilder-bottom-image'
                  className='h-4'
                />
              }
              text={
                viewTypes.filter((item) => item.viewType === viewType)[0]?.text
              }
              endIcon={
                <img
                  src={
                    !openSplit
                      ? '/assets/images/listBuilder/arrow-bottom.svg'
                      : '/assets/images/listBuilder/arrow-top.svg'
                  }
                  alt='list builder bottom image'
                />
              }
            />
            <StyledMenu
              anchorEl={split}
              open={openSplit}
              onClose={handleClose}
              disableScrollLock={true}
            >
              <div className='px-4'>
                {viewTypes.map((item, index) => (
                  <MenuItem
                    key={index}
                    text={item?.text}
                    icon={'/assets/images/listBuilder/' + item?.url}
                    onClick={() => {
                      dispatch(setViewType(item?.viewType as any));
                      setCardPageIndex(1);
                      handleClose();
                    }}
                    active={viewType === item?.viewType ? 'menu-active' : ''}
                  />
                ))}
              </div>
            </StyledMenu>
          </div>
        </div>
      </div>

      <div
        className={
          ' px-4 ' + (viewType === 3 ? 'bg-[#3263c92e] min-h-[100vh] !p-4' : '')
        }
      >
        {(viewType === 0 || viewType === 1) && (
          <div className='mb-4'>
            <MapBoxClusterView
              mapId='map-homes-listbuilder'
              mapData={getMapViewData}
              isPopup={true}
              height={viewType === 0 ? '!h-[calc(100vh-210px)]' : ''}
            />
          </div>
        )}
        {(viewType === 1 || viewType === 2) && (
          <div
            className={`mb-5 w-full ${
              viewType === 2 ? 'h-[calc(100vh-215px)]' : ''
            }`}
          >
            <div className='relative h-[460px]'>
              <Table
                header={propertyListTableHeader}
                body={tableData}
                loading={loading}
              />
            </div>
            <div className='mt-3 flex w-full justify-center'>
              <Pagination
                showFirstButton
                showLastButton
                count={Math.ceil(totalCount / tablePagePerCount)}
                page={tablePageIndex}
                onChange={async (e: any, pageIndex: number) => {
                  dispatch(setTablePageIndex(pageIndex));
                }}
              />
            </div>
          </div>
        )}

        {viewType === 3 && (
          <InfiniteScroll
            className={
              'pb-4 grid gap-3 relative min-h-[100vh] ' +
              (toggleFilters
                ? 'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5')
            }
            dataLength={(cardPageIndex - 1) * cardPagePerCount}
            pullDownToRefreshThreshold={totalCount}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollThreshold={1}
            loader={
              <>
                {Array.apply('', new Array(cardPagePerCount)).map(
                  (item, index) => {
                    return cardData.length !== 0 ? (
                      <CardLoader key={index} />
                    ) : (
                      <></>
                    );
                  }
                )}
              </>
            }
          >
            {loading ? (
              Array.apply('', new Array(10)).map((item, index) => {
                return <CardLoader key={index} />;
              })
            ) : cardData.length === 0 ? (
              <div className='absolute flex h-[570px] w-full items-center justify-center font-montserrat text-base font-medium text-sfra-gray-300 backdrop-blur-[1px]'>
                No data available
              </div>
            ) : (
              cardData?.map((item: any, index: number) => {
                return <Card key={index} {...item} />;
              })
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Right;

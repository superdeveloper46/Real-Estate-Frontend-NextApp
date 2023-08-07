import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Skeleton } from '@mui/material';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import MapBoxClusterView from '@/components/MapBoxView/MapBoxClusterView.component';
import AddToList from '@/components/Pages/ListBuilder/Card/AddToList.component';
import AddToListFooter from '@/components/Pages/ListBuilder/Card/AddToListFooter.component';
import Basic from '@/components/Pages/Property/demographics/Basic';
import Plus from '@/components/Pages/Property/demographics/Plus';
import Premium from '@/components/Pages/Property/demographics/Premium';
import Files from '@/components/Pages/Property/filesAndPhotos/Files';
import Photos from '@/components/Pages/Property/filesAndPhotos/Photos';
import LeftTabItem from '@/components/Pages/Property/LeftTabItem.component';
import Notes from '@/components/Pages/Property/notes/Notes';
import Contacts from '@/components/Pages/Property/overView/Contacts';
import Property from '@/components/Pages/Property/overView/Property';
import OverviewValue from '@/components/Pages/Property/overView/Value';
import Characteristics from '@/components/Pages/Property/property/Characteristics';
import Last from '@/components/Pages/Property/property/Last';
import Location from '@/components/Pages/Property/property/Location';
import TaxInformation from '@/components/Pages/Property/property/TaxInformation';
import PropertyValue from '@/components/Pages/Property/property/Value';
import History from '@/components/Pages/Property/transaction/History';
import Mortgages from '@/components/Pages/Property/transaction/Mortgages';
import CommonTab from '@/components/Tab/CommonTab.component';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { setData } from '@/redux/slices/property';
import { dispatch, useSelector } from '@/redux/store';
import {
  getCurrentMortgagesData,
  getOverviewData,
  getOwnerDemographicsData,
  getPropertyData,
  getTransactionAndMortgageHistoryData,
} from '@/utils/api/restful/property';
import { AppConfig } from '@/utils/AppConfig';

import FactsItem from '../../components/Pages/Property/FactsItem.component';

const PropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedItem, setSelectedItem] = useState(0);
  const [openAddToList, setOpenAddToList] = useState(false);
  const [imgUrl, setImageUrl] = useState('');
  const { property } = useSelector((state: any) => state.property);
  const { overview } = useSelector((state: any) => state.property);

  const leftItems = [
    {
      title: 'Overview',
      icon: '/assets/images/property/overView.svg',
    },
    {
      title: 'Property',
      icon: '/assets/images/property/property.svg',
    },
    {
      title: 'Mortgage & Transaction',
      icon: '/assets/images/property/transaction.svg',
    },
    {
      title: 'Owner Demographics',
      icon: '/assets/images/property/demographics.svg',
    },
    {
      title: 'Notes',
      icon: '/assets/images/property/notes.svg',
    },
    {
      title: 'Files & Photos',
      icon: '/assets/images/property/photos.svg',
    },
  ];

  const tabList = [
    [{ title: 'PROPERTY' }, { title: 'CONTACTS' }, { title: 'VALUE' }],
    [
      { title: 'CHARACTERISTICS' },
      { title: 'LOCATION' },
      { title: 'VALUE' },
      { title: 'TAX INFORMATION' },
      { title: "LAST ARM'S LENGTH SALE INFORMATION" },
    ],
    [{ title: 'CURRENT MORTGAGES' }, { title: 'HISTORY' }],
    [
      { title: 'BASIC' },
      { title: 'PLUS' },
      {
        title: 'PREMIUM',
        icon: <img src='/assets/images/property/key.svg' alt='key icon' />,
      },
    ],
    [{ title: 'NOTES' }, { title: 'ARCHIVED NOTES' }],
    [{ title: 'FILES' }, { title: 'PHOTOS' }],
  ];

  const tabCoponentList = [
    [<Property key={1} />, <Contacts key={2} />, <OverviewValue key={3} />],
    [
      <Characteristics key={1} />,
      <Location key={2} />,
      <PropertyValue key={3} />,
      <TaxInformation key={4} />,
      <Last key={5} />,
    ],
    [<Mortgages key={1} />, <History key={2} />],
    [<Basic key={1} />, <Plus key={2} />, <Premium key={3} />],
    [<Notes key={2} type='unArchive' />, <Notes key={2} type='archive' />],
    [<Files key={1} />, <Photos key={2} />],
  ];

  const mapViewData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          type: 'address',
          id,
          address: property?.situsfullstreetaddress,
          city: property?.situscity,
          zip: property?.situszip5,
          image:
            property?.property_type !== undefined &&
            property?.property_type !== null
              ? property?.property_type.search(' Residential') !== -1
                ? 'img1'
                : property?.property_type.search('Commercial') !== -1
                ? 'img2'
                : property?.property_type.search('Land') !== -1
                ? 'img4'
                : 'img3'
              : 'img1',
          count: 1,
        },
        geometry: {
          type: 'Point',
          coordinates: [property?.situslongitude, property?.situslatitude],
        },
      },
    ],
  };

  const getData = (data: any) => {
    if (!data) return [];
    Object.keys(data).forEach((key) => {
      data[key] = data[key] === '' || data[key] === null ? 'null' : data[key];
    });
    return data;
  };

  useEffect(() => {
    if (!id) return;

    getPropertyData(id as string).then((data) => {
      dispatch(
        setData({ key: 'property', data: getData(data?.result) } as any)
      );
    });

    getOverviewData(id as string).then((data) => {
      dispatch(
        setData({ key: 'overview', data: getData(data?.result) } as any)
      );
    });

    getCurrentMortgagesData(id as string).then((data) => {
      dispatch(
        setData({
          key: 'currentMortgages',
          data: getData(data?.result),
        } as any)
      );
    });

    getTransactionAndMortgageHistoryData(id as string).then((data) => {
      dispatch(
        setData({
          key: 'transaction',
          data: getData(data?.result),
        } as any)
      );
    });

    getOwnerDemographicsData(id as string).then((data) => {
      dispatch(
        setData({
          key: 'ownerDemographics',
          data: getData(data?.result),
        } as any)
      );
    });
  }, [id]);

  useEffect(() => {
    if (
      property?.situslatitude === undefined ||
      property?.situslongitude === undefined
    )
      return;
    fetch(
      `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_URL}/streetview?size=800x400&location=${property?.situslatitude},${property?.situslongitude}&fov=90&pitch=10&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&source=outdoor`
    )
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        setImageUrl(URL.createObjectURL(data));
      });
  }, [property]);

  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full'>
        <div className='flex justify-between border-b border-gray-100 px-5 shadow-[0px_1px_6px_rgba(0,0,0,0.08)]'>
          <div
            className='group flex items-center space-x-2'
            onClick={() =>
              Router.push('/list-builder', undefined, { shallow: true })
            }
          >
            <div className=''>
              <img
                src='/assets/images/property/back.svg'
                alt='back.svg'
                className='blue-svg h-6'
              />
            </div>
            <div className='cursor-pointer font-montserrat text-xs font-normal text-sfra-gray-400'>
              {property?.mailingcity}
            </div>
          </div>
          <div className='my-1'>
            <Button
              text='Property to List'
              classes='rounded-[10px] h-7 group hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
              onClick={() => setOpenAddToList(true)}
              startIcon={
                <img
                  src='/assets/images/listBuilder/makeNewList.svg'
                  alt='addTolist icon'
                  className='blue-svg h-4'
                />
              }
            />
          </div>
        </div>

        <div className='space-y-3 bg-sfra-gray-700 px-5 py-3'>
          <div className='flex h-full space-x-3'>
            <div className='flex h-[290px] w-[400px] overflow-hidden rounded-2xl'>
              {imgUrl === '' ? (
                <Skeleton
                  variant='rounded'
                  style={{ borderRadius: '1rem' }}
                  width={'100%'}
                  height={'100%'}
                />
              ) : (
                <img
                  className='h-full w-full'
                  src={imgUrl}
                  alt='propery image'
                />
              )}
            </div>
            <div className='h-[290px] w-[calc(100%-400px)] rounded-[20px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.11)]'>
              <div className='flex w-full items-center justify-between  rounded-t-[20px] bg-sfra-gray-700 py-2 pl-3'>
                <div className='flex items-center space-x-2'>
                  <span>
                    <img
                      src='/assets/images/property/quickFacts.svg'
                      alt='card-header-icon'
                      className='h-4'
                    />
                  </span>
                  <span className='font-montserrat text-ms font-normal text-sfra-blue-100 '>
                    Quick Facts
                  </span>
                </div>
              </div>

              <div className='my-3 mx-1 h-[67%] overflow-auto'>
                <div className='float-left w-full space-y-2 px-3 md:w-full xl:w-1/2'>
                  <FactsItem
                    text='Owner Name (on deed)'
                    value={property?.ownername1full}
                  />
                  <FactsItem
                    text='Number of SFR Homes Owned'
                    value={overview?.sfr_cnt}
                  />
                  <FactsItem text='HOA' value={property?.hoa1name} />
                  <FactsItem
                    text='APN'
                    value={
                      property?.apn === '' || property?.apn === null
                        ? 'null'
                        : property?.apn
                    }
                  />
                  <FactsItem
                    text='Length of Ownership'
                    value={overview?.owner1ownershiprights}
                  />
                </div>
                <div className='float-left space-y-2 px-3 md:mt-2 md:w-full xl:mt-0 xl:w-1/2'>
                  <FactsItem text='Owner Type' value={overview?.owner_type} />
                  <FactsItem text='Status' value={property?.pfc_status} />
                  <FactsItem text='County' value={property?.county} />
                  <FactsItem
                    text='Owner Occupied'
                    value={overview?.owneroccupied}
                  />
                </div>
              </div>

              <div className='mr-6 flex cursor-pointer items-center justify-end space-x-2'>
                <div>
                  <img
                    src='/assets/images/property/factsItemView.svg'
                    alt='itemView icon'
                    className='h-5'
                  />
                </div>
                <div className='font-montserrat text-xs font-normal text-sfra-blue-100'>
                  See property on the map
                </div>
                <div>
                  <img
                    src='/assets/images/listBuilder/notViewProfile.svg'
                    alt='itemView icon'
                    className='default-blue-svg h-5'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative h-[430px] rounded-lg bg-white py-5'>
            <div className='absolute flex h-[85%] w-[50px] flex-col justify-between rounded-r-xl bg-sfra-blue-200 py-8'>
              {leftItems.map((item, index) => (
                <LeftTabItem
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  active={selectedItem === index}
                  onClick={() => {
                    setSelectedItem(index);
                  }}
                />
              ))}
            </div>

            <div className='ml-[80px] w-[85%]'>
              <div className='mb-4 font-montserrat text-base font-medium text-sfra-blue-100'>
                {leftItems[selectedItem]?.title}
              </div>
              <div>
                <CommonTab
                  tabs={tabList[selectedItem] ?? []}
                  setDefault={selectedItem}
                  shadow
                  variant='sm'
                  childComponents={tabCoponentList[selectedItem] ?? []}
                />
              </div>
            </div>
          </div>

          <div className='rounded-lg bg-white px-4 pt-4 pb-0.5'>
            <div className='mb-2 font-montserrat text-base font-medium text-sfra-blue-100'>
              Property one the map
            </div>
            <div>
              <MapBoxClusterView
                mapId='map-homes-listbuilder'
                mapData={mapViewData}
                isPopup={false}
                height={'h-full'}
              />
            </div>
          </div>
        </div>
      </section>

      <Dialog
        icon='/assets/images/listBuilder/noteAddList.svg'
        iconClasses='default-white-svg'
        title={'Add to list'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenAddToList(false)}
        body={
          <AddToList
            url={imgUrl}
            id={id as string}
            long={property?.situslongitude}
            lat={property?.situslatitude}
            street={property?.situsfullstreetaddress}
            name={property?.ownername1full}
          />
        }
        footer={
          <AddToListFooter
            setOpenAddToList={setOpenAddToList}
            id={id ? Number(id) : 0}
          />
        }
        open={openAddToList}
      />
    </Main>
  );
};

export default PropertyPage;

export const getServerSideProps = withPageAuthRequired();

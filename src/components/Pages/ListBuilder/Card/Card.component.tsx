import Tooltip from '@mui/material/Tooltip';
import { property } from 'lodash';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import ImageIcon from '@/components/ImageIcon/ImageIcon';
import MenuItem from '@/components/Pages/ListBuilder/MenuItem.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';

import AddToList from './AddToList.component';
import AddToListFooter from './AddToListFooter.component';
import HorizontalItem from './HorizontalItem.component';
import MoveToList from './MoveToList.component';
import MoveToListFooter from './MoveToListFooter.component';
import PropertyInfo from './PropertyInfo.component';
import RemoveFromList from './RemoveFromList.component';
import RemoveFromListFooter from './RemoveFromListFooter.component';
import style from './style.module.scss';
import VerticalItem from './VerticalItem.component';

const Card = (props: CardProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [imgUrl, setImageUrl] = useState('');

  const openAnchor = Boolean(anchor);
  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const [openInfoList, setOpenInfoList] = useState(false);
  const handleOpenInfoList = () => {
    setOpenInfoList(true);
  };

  const [openMoveToList, setOpenMoveToList] = useState(false);
  const handleOpenMoveToList = () => {
    setOpenMoveToList(true);
  };

  const [openRemoveFromList, setOpenRemoveFromList] = useState(false);
  const handleOpenRemoveFromList = () => {
    setOpenRemoveFromList(true);
  };

  const [openAddToList, setOpenAddToList] = useState(false);
  const handleOpenAddToList = () => {
    setOpenAddToList(true);
  };

  const handleViewFullProfile = () => {
    Router.push(`/property/${props?.propertyid}`);
  };

  const InfoFooter = () => {
    return (
      <div className='flex h-11 w-80 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-blue-100'
          classes='!bg-white color'
          onClick={() => setOpenInfoList(false)}
        />
        <Button
          text='View Full Profile'
          onClick={() => {
            setOpenInfoList(false);
            handleViewFullProfile();
          }}
          classes='rounded-3xl group hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
          endIcon={
            <img
              src='/assets/images/listBuilder/notViewProfile.svg'
              alt='notViewProfile icon'
              className='default-white-svg blue-svg h-5'
            />
          }
        />
      </div>
    );
  };

  const InfoHeader = () => {
    const [anchorChild, setAnchorChild] = useState<null | HTMLElement>(null);
    const openAnchorChild = Boolean(anchorChild);
    const handleAnchorChildClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorChild(event.currentTarget);
    };
    return (
      <div>
        <div
          className='-mr-4 cursor-pointer rounded-3xl p-1.5 hover:bg-sfra-gray-100/10'
          onClick={handleAnchorChildClick}
          id='anchorChildId'
        >
          <img
            src='/assets/images/listBuilder/cardMore.svg'
            alt='card-header-icon'
            className='default-white-svg'
          />
        </div>
        <StyledMenu
          anchorEl={anchorChild}
          open={openAnchorChild}
          onClose={() => setAnchorChild(null)}
          disableScrollLock={true}
          minWidth={1}
          borderRadius={10}
        >
          <div className='px-2'>
            <MenuItem
              text={'Add to List'}
              icon={'/assets/images/listBuilder/noteAddList.svg'}
              iconClass={'!h-3.5'}
              onClick={() => {
                handleClose();
                handleOpenAddToList();
              }}
            />
            <MenuItem
              text={'Remove from List'}
              icon={'/assets/images/listBuilder/noteRemoveList.svg'}
              iconClass={'!h-4'}
              varient='pink'
              onClick={() => {
                handleClose();
                handleOpenRemoveFromList();
              }}
            />
            <MenuItem
              text={'Add Note'}
              iconClass={'!h-3.5'}
              icon={'/assets/images/listBuilder/noteAddNote.svg'}
            />
            <MenuItem
              text={'Move to'}
              iconClass={'!h-3.5'}
              icon={'/assets/images/listBuilder/moveTo.svg'}
              onClick={() => {
                handleClose();
                handleOpenMoveToList();
              }}
            />
          </div>
        </StyledMenu>
      </div>
    );
  };

  useEffect(() => {
    if (
      props?.situslatitude === undefined ||
      props?.situslongitude === undefined
    )
      return;
    fetch(
      `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_URL}/streetview?size=800x400&location=${props?.situslatitude},${props?.situslongitude}&fov=90&pitch=10&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&source=outdoor`
    )
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        setImageUrl(URL.createObjectURL(data));
      });
  }, [property]);

  return (
    <div className='w-full rounded-xl bg-white shadow-md'>
      <div className='flex w-full items-center justify-between rounded-t-xl bg-sfra-blue-10 py-1 pl-2 pr-1'>
        <div className='flex items-center space-x-2'>
          <span>
            <img
              src='/assets/images/listBuilder/cardHeader.svg'
              alt='card-header-icon'
              className='h-5'
            />
          </span>
          <span className='font-montserrat text-xs font-normal text-sfra-gray-400 '>
            {props?.situsfullstreetaddress ?? 'null'}
          </span>
        </div>
        <div
          className='cursor-pointer rounded-3xl p-2 hover:bg-sfra-gray-50'
          onClick={handleAnchorClick}
        >
          <img
            src='/assets/images/listBuilder/cardMore.svg'
            alt='card-header-icon'
            className='h-5'
          />
        </div>
        <StyledMenu
          anchorEl={anchor}
          open={openAnchor}
          onClose={handleClose}
          disableScrollLock={true}
          minWidth={1}
          borderRadius={10}
        >
          <div className='px-2'>
            <MenuItem
              text={'Add to List'}
              icon={'/assets/images/listBuilder/noteAddList.svg'}
              iconClass={'!h-3.5'}
              onClick={() => {
                handleClose();
                handleOpenAddToList();
              }}
            />
            <MenuItem
              text={'Remove from List'}
              icon={'/assets/images/listBuilder/noteRemoveList.svg'}
              iconClass={'!h-4'}
              varient='pink'
              onClick={() => {
                handleClose();
                handleOpenRemoveFromList();
              }}
            />
            <MenuItem
              text={'Add Note'}
              icon={'/assets/images/listBuilder/noteAddNote.svg'}
              iconClass={'!h-3.5'}
            />
            <MenuItem
              text={'Quick view'}
              icon={'/assets/images/listBuilder/noteQuickView.svg'}
              iconClass={'!h-3.5'}
              onClick={() => {
                handleClose();
                handleOpenInfoList();
              }}
            />

            <div className='my-1 border-b'></div>

            <div
              className='flex cursor-pointer items-center justify-between px-3 py-1.5'
              onClick={handleViewFullProfile}
            >
              <div className='whitespace-nowrap font-montserrat text-xs text-sfra-gray-200 hover:font-medium'>
                View Full Profile
              </div>
              <div>
                <img
                  src='/assets/images/listBuilder/notViewProfile.svg'
                  alt='noteQuickView'
                  className='h-5'
                />
              </div>
            </div>
          </div>
        </StyledMenu>
      </div>
      <div className='mx-1 flex items-center justify-between border-b py-3'>
        <div className='flex h-full w-3/5 items-center px-2'>
          <div className={style.text}>Name</div>
          <div className={`${style.vSeperator} !h-3`}></div>
          <Tooltip
            title={props?.ownername1full}
            placement='bottom'
            componentsProps={{
              tooltip: {
                sx: {
                  color: '#7E7E8A',
                  backgroundColor: 'white',
                  fontSize: '0.75rem',
                  fontFamily: 'Montserrat',
                  fontWeight: '300',
                  padding: '10px',
                  boxShadow: '0px 0px 10px rgba(0,0,0,0.21)',
                },
              },
            }}
          >
            <div
              className={
                style.text +
                ' cursor-pointer w-4/5 font-medium overflow-hidden text-ellipsis whitespace-nowrap'
              }
            >
              {props?.ownername1full ?? 'null'}
            </div>
          </Tooltip>
        </div>
        <div className='flex h-full items-center px-2'>
          <div className={style.text}>Age</div>
          <div className={`${style.vSeperator} !h-3`}></div>
          <div className={`${style.text} font-medium`}>
            {props?.age ?? 'null'}
          </div>
        </div>
      </div>

      <div className='mx-2 border-b px-3 pb-1.5 pt-3.5'>
        <HorizontalItem
          text='Purchase Price'
          value={props?.currentsalesprice ?? 'null'}
        />
        <HorizontalItem
          text='Estimated Value'
          value={props?.currentavmvalue ?? 'null'}
        />
        <HorizontalItem
          text='Equity'
          value={props?.equity ?? 'null'}
          disabled={true}
        />
        <HorizontalItem
          text='Purchase Date'
          value={props?.sales_date ?? 'null'}
        />
      </div>

      <div className='mx-2 flex justify-between border-b p-1.5 pt-3.5'>
        <VerticalItem text='YEAR BUILT' value={props?.yearbuilt ?? 'null'} />
        <div className={style.vSeperator + ' !h-10'}></div>
        <VerticalItem text='SQFT' value={props?.sumbuildingsqft ?? 'null'} />
        <div className={style.vSeperator + ' !h-10'}></div>
        <VerticalItem text='BEDS' value={props?.bedrooms ?? 'null'} />
        <div className={style.vSeperator + ' !h-10'}></div>
        <VerticalItem text='BATHS' value={props?.bathtotalcalc ?? 'null'} />
      </div>

      <div className='mx-5 flex justify-between px-5 py-3.5'>
        <div className={style.bottomItem + ' group'}>
          <ImageIcon
            src={'/assets/images/listBuilder/cardBottom1.svg'}
            alt={'card-bottom-icon'}
            varient='blue'
            size='w-6'
          />
        </div>

        <div className={style.bottomItem + ' group'}>
          <ImageIcon
            src={'/assets/images/listBuilder/cardBottom2.svg'}
            alt={'card-bottom-icon'}
            varient='blue'
            size='w-6'
          />
        </div>

        <div className={style.bottomItem + ' group'}>
          <ImageIcon
            src={'/assets/images/listBuilder/cardBottom3.svg'}
            alt={'card-bottom-icon'}
            varient='blue'
            size='w-6'
          />
        </div>
      </div>

      <Dialog
        icon='/assets/images/listBuilder/propertyInfo.svg'
        title={'Property Info'}
        classes='!bg-sfra-blue-300 !text-white !py-2'
        closeDialog={() => setOpenInfoList(false)}
        header={<InfoHeader />}
        body={<PropertyInfo {...props} />}
        footer={<InfoFooter />}
        open={openInfoList}
      />

      <Dialog
        icon='/assets/images/listBuilder/moveTo.svg'
        iconClasses='default-white-svg'
        title={'Move to'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenMoveToList(false)}
        body={<MoveToList />}
        footer={<MoveToListFooter />}
        open={openMoveToList}
      />

      <Dialog
        icon='/assets/images/listBuilder/removeFromList.svg'
        title={'Remove from List'}
        classes='!bg-sfra-blue-300 !text-sfra-pink-100'
        closeDialog={() => setOpenRemoveFromList(false)}
        body={<RemoveFromList />}
        footer={
          <RemoveFromListFooter setOpenRemoveFromList={setOpenRemoveFromList} />
        }
        open={openRemoveFromList}
      />

      <Dialog
        icon='/assets/images/listBuilder/noteAddList.svg'
        iconClasses='default-white-svg'
        title={'Add to list'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenAddToList(false)}
        body={
          <AddToList
            url={imgUrl}
            id={props?.propertyid}
            long={props?.situslongitude}
            lat={props?.situslatitude}
            street={props?.situsfullstreetaddress}
            name={props?.ownername1full}
          />
        }
        footer={
          <AddToListFooter
            setOpenAddToList={setOpenAddToList}
            id={Number(props?.propertyid)}
          />
        }
        open={openAddToList}
      />
    </div>
  );
};

export default Card;

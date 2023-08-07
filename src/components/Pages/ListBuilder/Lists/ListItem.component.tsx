import React, { useState } from 'react';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';
import Switch from '@/components/Switch/Switch.compoennt';
import { editList } from '@/utils/api/restful/listbuilder';

import MenuItem from '../MenuItem.component';
import DeleteList from './DeleteList.component';
import EditList from './EditList.component';

type ListItemProps = {
  id: string;
  listName: string;
  totalCount: number;
  newCount?: number;
  filterCount: number;
  dmi: boolean;
  createAt: string;
  updateAt: string;
  handleDeleteRow: (id: string) => void;
  handleEditRow: (id: string, data: any) => void;
};

const ListItem = (props: ListItemProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const openAnchor = Boolean(anchor);
  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const [openDeleteList, setOpenDeleteList] = useState(false);

  const handleOpenDeleteList = () => {
    setOpenDeleteList(true);
  };

  const [listName, onListNameChanged] = useState(props?.listName);
  const [dmi, onDMIChanged] = useState(props?.dmi);

  const [openEditList, setOpenEditList] = useState(false);

  const handleDMIChanged = () => {
    onDMIChanged(!props?.dmi);
    const data = { ...props, dmi: !props?.dmi };
    props?.handleEditRow(props?.id, data);
    editList({
      id: props?.id,
      listName: props?.listName,
      dmi: !props?.dmi,
    });
  };

  const handleOpenEditList = () => {
    setOpenEditList(true);
  };

  const onCancelChange = () => {
    onListNameChanged(props?.listName);
  };

  const DeleteFooter = () => {
    return (
      <div className='flex h-11 w-80 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-pink-100'
          classes='!bg-white color'
          onClick={() => setOpenDeleteList(false)}
        />
        <Button
          text='Delete'
          onClick={() => {
            setOpenDeleteList(false);
            props?.handleDeleteRow(props?.id);
          }}
          classes='rounded-3xl px-10 !bg-sfra-pink-100 hover:!bg-white hover:text-sfra-pink-100 hover:border-2 hover:border-sfra-pink-100'
        />
      </div>
    );
  };

  const saveChange = () => {
    editList({ id: props?.id, listName, dmi }).then((data) => {
      props?.handleEditRow(props?.id, data);
    });
  };

  const EditFooter = () => {
    return (
      <div className='flex h-11 w-80 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-blue-100'
          classes='!bg-white color'
          onClick={() => setOpenEditList(false)}
        />
        <Button
          text='Save changes'
          onClick={() => {
            saveChange();
            setOpenEditList(false);
          }}
          classes='rounded-3xl px-10 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
        />
      </div>
    );
  };

  return (
    <div className='rounded-xl border'>
      <div className='flex items-center justify-between rounded-t-xl bg-sfra-gray-50 py-1 px-3'>
        <div className='font-montserrat text-ms font-medium text-sfra-gray-400'>
          {props?.listName}
        </div>
        <div
          className='cursor-pointer rounded-3xl p-1.5 hover:bg-sfra-gray-50'
          onClick={handleAnchorClick}
        >
          <img
            src='/assets/images/listBuilder/moreH.svg'
            alt='more icon'
            className='h-4'
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
          <div className='px-4'>
            <MenuItem
              text={'Edit List'}
              icon={'/assets/images/listBuilder/editList.svg'}
              iconClass={'!h-4'}
              varient='darkBlue'
              onClick={() => {
                handleClose();
                handleOpenEditList();
              }}
            />
            <MenuItem
              text={'Settings'}
              icon={'/assets/images/listBuilder/settings.svg'}
              iconClass={'!h-4'}
              varient='darkBlue'
            />
            <MenuItem
              text={'Copy List'}
              icon={'/assets/images/listBuilder/copyList.svg'}
              iconClass={'!h-4'}
              varient='darkBlue'
            />
            <MenuItem
              text={'Delete List'}
              icon={'/assets/images/listBuilder/deleteList.svg'}
              iconClass={'!h-4'}
              varient='darkBlue'
              onClick={() => {
                handleClose();
                handleOpenDeleteList();
              }}
            />
            <MenuItem
              text={'Share List'}
              icon={'/assets/images/listBuilder/shareList.svg'}
              iconClass={'!h-4'}
              varient='darkBlue'
            />
          </div>
        </StyledMenu>
      </div>
      <div className='flex h-32 flex-col items-center justify-center bg-white'>
        <div className='flex items-center justify-center space-x-2 pb-3 font-montserrat text-base font-medium text-sfra-gray-400'>
          <img
            src='/assets/images/listBuilder/propertiesList.svg'
            alt='propertiesList icon'
            className='default-black-svg h-3.5'
          />
          <span>{`${props?.totalCount} Properties`}</span>
        </div>
        {props?.newCount !== undefined && props?.newCount !== 0 && (
          <div className='flex justify-center pb-3 font-montserrat text-ms font-medium  text-sfra-blue-100'>
            <span>{`${props?.newCount} new properties added`}</span>
          </div>
        )}
        <div className='flex justify-center font-montserrat text-sxs font-normal text-sfra-gray-400'>
          <span>{`${props?.filterCount} ACTIVE FILTERS`}</span>
        </div>
      </div>
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center space-x-1'>
          <div>
            <img
              src='/assets/images/listBuilder/monitoring.svg'
              alt='monitoring icon'
              className='h-3.5'
            />
          </div>
          <div className='font-montserrat text-sxs font-normal text-sfra-gray-400'>
            MONITORING
          </div>
          <div className='!ml-2'>
            <Switch checked={props?.dmi} onClick={handleDMIChanged} />
          </div>
        </div>
        <div className='flex cursor-pointer items-center'>
          <div className='mr-1 font-montserrat text-xs font-normal text-sfra-blue-100 hover:font-medium'>
            Go to List
          </div>
          <div className=''>
            <img
              src='/assets/images/listBuilder/notViewProfile.svg'
              alt='noteQuickView'
              className='default-blue-svg h-4'
            />
          </div>
        </div>
      </div>

      <Dialog
        icon='/assets/images/listBuilder/deleteList.svg'
        iconClasses='default-pink-svg'
        title={'Delete a List'}
        classes='!bg-sfra-blue-300 !text-sfra-pink-100'
        closeDialog={() => setOpenDeleteList(false)}
        body={<DeleteList listName={props?.listName} />}
        footer={<DeleteFooter />}
        open={openDeleteList}
      />

      <Dialog
        icon='/assets/images/listBuilder/editList.svg'
        iconClasses='default-white-svg'
        title={'Edit a List'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenEditList(false)}
        body={
          <EditList
            {...props}
            dmi={dmi}
            listName={listName}
            onDMIChanged={onDMIChanged}
            onListNameChanged={onListNameChanged}
            onCancelChange={onCancelChange}
          />
        }
        footer={<EditFooter />}
        open={openEditList}
      />
    </div>
  );
};

export default ListItem;

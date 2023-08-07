import React, { useState } from 'react';

import Dialog from '@/components/Dialog/Dialog.component';
import StyledMenu from '@/components/StyledMenu/StyledMenu.component';

import MenuItem from '../../../ListBuilder/MenuItem.component';
import NoteDeleteBody from './NoteDeleteBody';
import NoteDeleteFooter from './NoteDeleteFooter';

type NotePropps = {
  id: string;
  date: string;
  note: string;
  archived: boolean;
  handleDeleteNote: (id: string) => void;
  handleArchiveNote: (id: string) => void;
  handleOpenEditNote: (id: string, note: string, archived: boolean) => void;
};

const NoteComponent = (props: NotePropps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchor);
  const handleAnchorClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const [openDeleteNote, setOpenDeleteNote] = useState(false);
  const handleOpenDeleteNote = () => {
    setOpenDeleteNote(true);
  };

  return (
    <div className='h-24 cursor-pointer overflow-y-auto rounded-[10px] border-[2px] border-white p-1.5 hover:border-sfra-blue-50'>
      <div className='flex items-center justify-between'>
        <div className='font-montserrat text-xs font-medium text-sfra-gray-600'>
          {props?.date}
        </div>
        <div>
          <div
            className='cursor-pointer rounded-3xl p-1.5 hover:bg-sfra-gray-50'
            onClick={handleAnchorClick}
          >
            <img
              src='/assets/images/listBuilder/cardMore.svg'
              alt='card-header-icon'
              className='h-4'
            />
          </div>
          <StyledMenu
            anchorEl={anchor}
            open={openAnchor}
            onClose={handleClose}
            disableScrollLock={true}
            minWidth={1}
            borderRadius={8}
          >
            <div className='px-2'>
              <MenuItem
                text={'Edit Note'}
                icon={'/assets/images/property/edit.svg'}
                iconClass={'!h-4'}
                varient='darkBlue'
                onClick={() => {
                  setAnchor(null);
                  props?.handleOpenEditNote(
                    props?.id,
                    props?.note,
                    props?.archived
                  );
                }}
              />
              <MenuItem
                text={!props?.archived ? 'Archive Note' : 'Unarchive Note'}
                icon={'/assets/images/property/archive.svg'}
                iconClass={'!h-4'}
                varient='green'
                onClick={() => {
                  handleClose();
                  props?.handleArchiveNote(props?.id);
                }}
              />
              <MenuItem
                text={'Delete Note'}
                icon={'/assets/images/property/delete.svg'}
                iconClass={'!h-4'}
                varient='pink'
                onClick={() => {
                  handleClose();
                  handleOpenDeleteNote();
                }}
              />
            </div>
          </StyledMenu>
        </div>
      </div>
      <div className='break-all font-montserrat text-xs font-normal text-sfra-gray-200'>
        {props?.note}
      </div>

      <Dialog
        icon='/assets/images/listBuilder/noteRemoveList.svg'
        iconClasses='default-pink-svg'
        title={'Delete Note'}
        classes='!bg-sfra-blue-300 !text-sfra-pink-100'
        closeDialog={() => setOpenDeleteNote(false)}
        body={<NoteDeleteBody />}
        footer={
          <NoteDeleteFooter
            setOpenDeleteNote={setOpenDeleteNote}
            handleDeleteNote={() => props?.handleDeleteNote(props?.id)}
          />
        }
        open={openDeleteNote}
      />
    </div>
  );
};

export default NoteComponent;

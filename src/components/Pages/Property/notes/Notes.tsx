import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button/Button.component';
import DatepickerComp from '@/components/Datepicker/Datepicker.component';
import Dialog from '@/components/Dialog/Dialog.component';
import {
  addNote as add,
  archiveNote,
  deleteNote,
  editNote as edit,
  getNotes,
} from '@/utils/api/restful/property';

import NoteComponent from './Note/Note.component';
import NoteAddBody from './Note/NoteAddBody';
import NoteAddFooter from './Note/NoteAddFooter';
import NoteLoader from './Note/NoteLoader';

type NoteProps = {
  type: string;
};

const Notes = (props: NoteProps) => {
  const router = useRouter();
  const propertyId = router.query.id;
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [note, setNote] = useState('');
  const [archived, setArchived] = useState(false);

  const [notes, setNotes] = useState([]);

  const [openAddNote, setOpenAddNote] = useState(false);
  const handleOpenAddNote = () => {
    setOpenAddNote(true);
    setId('');
    setNote('');
    setArchived(false);
  };

  const handleOpenEditNote = (
    id_: string,
    note_: string,
    archived_: boolean
  ) => {
    setOpenAddNote(true);
    setId(id_);
    setNote(note_);
    setArchived(archived_);
  };

  const getData = () => {
    setLoading(true);
    let archive = false;
    if (props?.type === 'unArchive') {
      archive = false;
    } else {
      archive = true;
    }
    getNotes({
      propertyId: propertyId as string,
      createAt: date,
      archived: archive,
    }).then((data: any) => {
      setNotes(data);
      setLoading(false);
    });
  };

  const addNote = async () => {
    const noteData: { propertyId: string; note: string; archived: boolean } = {
      propertyId: propertyId as string,
      note,
      archived,
    };
    add(noteData).then(() => {
      getData();
    });
  };

  const editNote = async () => {
    const noteData: {
      id: string;
      note: string;
      archived: boolean;
    } = {
      id,
      note,
      archived,
    };
    edit(noteData).then(() => {
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, [props?.type, date]);

  const handleDeleteNote = (noteId: string) => {
    const rows = notes.filter((row: any) => row.id !== noteId);
    setNotes(rows);
    deleteNote({ id: noteId });
  };

  const handleArchiveNote = (noteId: string) => {
    const rows = notes.filter((row: any) => row.id !== noteId);
    setNotes(rows);
    let archive = false;
    if (props?.type === 'unArchive') {
      archive = true;
    } else {
      archive = false;
    }
    archiveNote({ id: noteId, archived: archive });
  };

  return (
    <div className='my-4 ml-6'>
      <div className='my-2 flex items-center justify-between'>
        <div className='w-32'>
          <DatepickerComp
            value={date}
            border='none'
            setValue={(value) => {
              setDate(value);
            }}
          />
        </div>
        {props?.type === 'unArchive' && (
          <div>
            <Button
              text='Add Note'
              classes='rounded-[10px] h-7 group hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
              startIcon={
                <img
                  src='/assets/images/listBuilder/makeNewList.svg'
                  alt='addTolist icon'
                  className='blue-svg h-4'
                />
              }
              onClick={handleOpenAddNote}
            />
          </div>
        )}
      </div>
      {loading ? (
        [1, 2].map((index) => <NoteLoader key={index} />)
      ) : (
        <div className='h-60 space-y-3 overflow-auto'>
          {notes?.map((item: any, index) => (
            <NoteComponent
              key={index}
              id={item?.id}
              date={format(new Date(item?.createAt), 'yyyy-MM-dd')}
              note={item?.note}
              archived={item?.archived}
              handleDeleteNote={handleDeleteNote}
              handleArchiveNote={handleArchiveNote}
              handleOpenEditNote={handleOpenEditNote}
            />
          ))}
        </div>
      )}

      <Dialog
        icon='/assets/images/property/addNote.svg'
        title={id === '' ? 'Add Note' : 'Edit Note'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenAddNote(false)}
        body={
          <NoteAddBody
            note={note}
            archived={archived}
            setNote={setNote}
            setArchived={setArchived}
          />
        }
        footer={
          <NoteAddFooter
            id={id}
            setOpenAddNote={setOpenAddNote}
            addNote={addNote}
            editNote={editNote}
          />
        }
        open={openAddNote}
      />
    </div>
  );
};

export default Notes;

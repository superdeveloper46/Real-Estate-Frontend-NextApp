import Button from '@/components/Button/Button.component';

type NoteAddFooterProps = {
  id: string;
  setOpenAddNote: (value: boolean) => void;
  addNote: () => void;
  editNote: () => void;
};

const NoteAddFooter = (props: NoteAddFooterProps) => {
  return (
    <div className='flex h-8 w-72 items-center justify-between'>
      <Button
        text='Cancel'
        textClass='text-gray-900 hover:text-sfra-blue-100'
        classes='!bg-white color'
        onClick={() => props?.setOpenAddNote(false)}
      />
      <Button
        text='Publish'
        onClick={() => {
          props?.setOpenAddNote(false);
          if (props?.id === '') props?.addNote();
          else props?.editNote();
        }}
        classes='rounded-3xl group px-8 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
      />
    </div>
  );
};

export default NoteAddFooter;

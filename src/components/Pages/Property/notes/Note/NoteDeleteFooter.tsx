import Button from '@/components/Button/Button.component';

type NoteDeleteFooterProps = {
  setOpenDeleteNote: (value: boolean) => void;
  handleDeleteNote: () => void;
};

const NoteDeleteFooter = (props: NoteDeleteFooterProps) => {
  return (
    <div className='mt-4 flex h-8 w-72 items-center justify-between'>
      <Button
        text='Cancel'
        textClass='text-gray-900 hover:text-sfra-pink-100'
        classes='!bg-white'
        onClick={() => props?.setOpenDeleteNote(false)}
      />
      <Button
        text='Delete'
        onClick={() => {
          props?.setOpenDeleteNote(false);
          props?.handleDeleteNote();
        }}
        classes='rounded-3xl px-8 !bg-sfra-pink-100 hover:!bg-white hover:text-sfra-pink-100 hover:border-2 hover:border-sfra-pink-100'
      />
    </div>
  );
};

export default NoteDeleteFooter;

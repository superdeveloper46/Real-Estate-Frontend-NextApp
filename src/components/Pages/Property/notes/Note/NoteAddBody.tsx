import CheckInput from '@/components/CheckInput/CheckInput.component';

const NoteAddBody = (props: any) => {
  return (
    <div className='space-y-4'>
      <div className=''>
        <textarea
          className='w-[480px] rounded-[10px] border border-[#E0E0E0] bg-sfra-blue-10 p-2 font-montserrat text-xs font-normal text-sfra-gray-200 outline-none'
          cols={30}
          rows={8}
          placeholder='Type Note...'
          onChange={(e) => props?.setNote(e.target.value)}
          value={props?.note}
        ></textarea>
      </div>
      <div>
        <CheckInput
          label={'Archive your note'}
          color='green'
          classes='mt-0'
          checked={props?.archived}
          onClick={() => {
            props?.setArchived(!props.archived);
          }}
        />
      </div>
    </div>
  );
};

export default NoteAddBody;

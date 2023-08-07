import Button from '@/components/Button/Button.component';

import MoveToListFooter from './MoveToListFooter.component';

type RemoveFromListFooterProps = {
  setOpenRemoveFromList: (value: boolean) => void;
};

const RemoveFromListFooter = (props: RemoveFromListFooterProps) => {
  return (
    <div>
      <MoveToListFooter />

      <div className='mt-5 flex items-center justify-end'>
        <Button
          text='Cancel'
          textClass='text-gray-900 mr-14 hover:text-sfra-pink-100'
          classes='!bg-white'
          onClick={() => props?.setOpenRemoveFromList(false)}
        />
        <Button
          text='Remove'
          onClick={() => {
            props?.setOpenRemoveFromList(false);
          }}
          classes='rounded-3xl w-32 !bg-sfra-pink-100 hover:!bg-white hover:text-sfra-pink-100 hover:border-2 hover:border-sfra-pink-100'
        />
      </div>
    </div>
  );
};

export default RemoveFromListFooter;

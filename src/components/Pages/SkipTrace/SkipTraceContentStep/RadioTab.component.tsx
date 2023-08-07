import RadioInput from '@/components/RadioInput/RadioInput.component';

const RadioTab = (props: {
  title: React.ReactNode;
  selected?: boolean;
  url: string;
  setSelectedTab: () => void;
}) => (
  <div
    className={`flex cursor-pointer items-center justify-between rounded border p-2 ${
      props?.selected ? 'bg-sfra-blue-10' : ''
    }`}
    onClick={() => props?.setSelectedTab()}
  >
    <div className='flex items-center space-x-2'>
      <img src={props?.url} alt='worksheet icon' />
      <div className='font-montserrat text-xs text-sfra-gray-200'>
        {props?.title}
      </div>
    </div>
    <div>
      <RadioInput checked={props?.selected} onClick={props?.setSelectedTab} />
    </div>
  </div>
);

export default RadioTab;

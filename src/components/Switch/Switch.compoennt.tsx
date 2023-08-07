type SwitchProps = {
  checked: boolean;
  onClick: () => void;
};

export default function Switch(props: SwitchProps) {
  return (
    <div className='relative flex flex-col items-center justify-center overflow-hidden'>
      <div className='flex'>
        <label className='relative mr-5 inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            className='peer sr-only'
            checked={props.checked}
            readOnly
          />
          <div
            onClick={() => {
              props?.onClick();
            }}
            className="peer h-3.5 w-8 rounded-full border  after:absolute  after:top-0.5 after:left-[2px] after:h-2.5 after:w-2.5 after:rounded-full after:border after:border-gray-300 after:bg-sfra-gray-500 after:transition-all after:content-[''] peer-checked:bg-sfra-green-100 peer-checked:after:left-[19px] peer-checked:after:border-white peer-checked:after:bg-white"
          ></div>
        </label>
      </div>
    </div>
  );
}

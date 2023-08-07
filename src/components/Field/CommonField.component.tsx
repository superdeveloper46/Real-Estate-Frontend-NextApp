import React from 'react';

type CommonFieldProps = {
  className?: string;
  value?: string;
  type: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onChange: (val: any) => void;
  onKeyDown?: (e: any) => void;
};

const CommonField = (props: CommonFieldProps) => {
  return (
    <div
      className={`flex w-full overflow-hidden rounded-lg border ${props?.className}`}
    >
      {props?.startIcon ? (
        <div className='p-2.5'>{props?.startIcon}</div>
      ) : (
        <></>
      )}
      <div className={'w-full'}>
        <input
          type={props?.type}
          placeholder={props?.placeholder}
          value={props?.value}
          className='w-full border-none p-2 text-base font-normal text-gray-900 placeholder:text-[#52516A] focus:z-10 focus:outline-none'
          onKeyDown={(e: any) =>
            props?.onKeyDown ? props?.onKeyDown(e) : null
          }
          onChange={(e) => props?.onChange(e.target.value)}
        />
      </div>
      {props?.endIcon ? <div className='p-2.5'>{props?.endIcon}</div> : <></>}
    </div>
  );
};

export default CommonField;

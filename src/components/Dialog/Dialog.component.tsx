import React from 'react';

type DialogProps = {
  title: string;
  icon?: string;
  classes?: string;
  iconClasses?: string;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  closeDialog: () => void;
  open: boolean;
};

const Dialog = (props: DialogProps) => {
  return (
    <>
      {props?.open && (
        <div className='fixed inset-0 z-[100] flex cursor-default items-center justify-center'>
          <div
            className='fixed inset-0 bg-black/50'
            onClick={props?.closeDialog}
          ></div>
          <div className='z-30 mx-auto w-auto'>
            <div className='relative flex w-full flex-col rounded-[10px] bg-white shadow-lg'>
              <div
                className={
                  'flex relative items-center justify-between rounded-t-[10px] bg-sfra-blue-10 px-6 py-3 text-sfra-gray-400 ' +
                  props?.classes
                }
              >
                <div className='flex space-x-4'>
                  {props?.icon && (
                    <img
                      src={props?.icon}
                      alt='modal-icon'
                      className={`${props?.iconClasses} h-5`}
                    />
                  )}
                  <div className='font-montserrat text-ms font-normal'>
                    {props?.title}
                  </div>
                </div>
                {props?.header && <>{props?.header}</>}
              </div>
              <div className='relative flex-auto px-6 pt-4'>{props?.body}</div>
              <div className='flex justify-end rounded-b-[10px] py-5 px-6'>
                {props?.footer && <>{props?.footer}</>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;

import React, { useState } from 'react';

const Description = (props: { text: string }) => {
  return (
    <li className='flex space-x-3'>
      <img src='/assets/images/payment/item.svg' alt='item svg' />
      <span className={'text-[13px] font-normal leading-tight'}>
        {props?.text}
      </span>
    </li>
  );
};

type MembershipCardProps = {
  title: string;
  isMonthly: boolean;
  membershipValue: string | number;
  selected: boolean;
  recommended?: boolean;
  onClick?: () => void;
};

const MembershipCard = (props: MembershipCardProps) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  return (
    <div
      className={`flex h-[330px] w-[203px] max-w-sm cursor-pointer flex-col justify-center space-y-1 rounded-3xl px-4 font-montserrat ${
        mouseOver
          ? 'bg-white text-sfra-gray-400'
          : props.recommended
          ? 'bg-sfra-blue-100 text-white'
          : 'bg-white text-sfra-gray-400'
      }`}
      onMouseOver={() => {
        setMouseOver(true);
      }}
      onMouseOut={() => {
        setMouseOver(false);
      }}
    >
      <h5 className={'text-center text-xl font-medium'}>{props?.title}</h5>
      <div className={'flex items-center justify-center'}>
        <span className='text-3xl font-semibold'>
          $ {props?.membershipValue}
        </span>
      </div>
      <div className='flex items-center justify-center'>
        <span className={'text-sm font-normal'}>
          Credits / {props.isMonthly ? 'Month' : 'Year'}
        </span>
      </div>

      {props.recommended ? (
        <div className='text-center'>
          <img
            className='mx-auto mt-4'
            src='/assets/images/payment/recommended.svg'
            alt='membership recommended'
          />
          <span className='text-xs font-semibold text-sfra-pink-100'>
            RECOMMENDED
          </span>
        </div>
      ) : (
        <div className='h-8'></div>
      )}

      <div>
        <ul role='list' className='my-3 space-y-1'>
          {[
            'Lorem ipsum dolor sit',
            'Lorem ipsum dolor sit',
            'Lorem ipsum dolor sit',
          ].map((item, index) => (
            <Description key={index} text={item} />
          ))}
        </ul>
        <button
          className={`inline-flex w-full justify-center rounded-xl px-5 py-2.5 text-center text-sm font-medium ${
            mouseOver
              ? 'bg-sfra-blue-100 text-white'
              : props.recommended
              ? 'bg-white text-sfra-blue-100'
              : 'bg-[#DAE3F4] text-sfra-blue-100'
          }`}
          onClick={!props.selected ? props.onClick : () => {}}
        >
          {props.selected ? 'Subscribed' : 'Get Started'}
        </button>
      </div>
    </div>
  );
};

export default MembershipCard;

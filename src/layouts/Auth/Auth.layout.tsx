import type { ReactNode } from 'react';

import Logo from '@/components/Logo/Logo.component';

type AuthProps = {
  children: ReactNode;
  title: string;
};

const Auth = (props: AuthProps) => {
  return (
    <div
      className='flex min-h-screen w-full items-center justify-center'
      style={{
        background:
          'linear-gradient(155.49deg, #3263C9 7.17%, #304988 51.73%, #2E2E46 105.49%)',
      }}
    >
      <div className='flex h-screen w-full justify-between'>
        <div className='h-full w-[calc(100vw-500px)]'>
          <div className='flex h-full items-center justify-center'>
            <h2 className='text- w-1/2 text-center font-montserrat text-5xl font-semibold text-[#F2F2F2]'>
              The most powerful residential real estate data platform
            </h2>
          </div>
        </div>
        <div className='flex h-full w-[600px] flex-col rounded-l-3xl bg-white px-10 pb-8 pt-5'>
          <div className='flex justify-end'>
            <Logo variant='large' />
          </div>
          <div className='flex h-full items-center justify-center'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

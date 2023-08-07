import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useContext } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import Logo from '@/components/Logo/Logo.component';
import Notifcation from '@/components/Notification/Notifcation';
import { StepContext } from '@/components/Pages/Billing/Constant/StepContext';

type BillingLayoutProps = {
  children: ReactNode;
};

const BillingLayout = (props: BillingLayoutProps) => {
  const router = useRouter();
  const { selectedStep, changeStep } = useContext(StepContext);
  const onBack = () => {
    if (selectedStep === 0) router.back();
    else changeStep(selectedStep - 1);
  };

  return (
    <div className='over flex min-h-screen justify-center bg-gray-200 px-4 pb-20 pt-10 font-montserrat text-sfra-gray-400 sm:px-6 lg:px-8'>
      <div className='w-full max-w-[700px] space-y-8'>
        <div className='mx-auto flex items-start justify-between'>
          <button className='flex items-center' onClick={onBack}>
            <FiChevronLeft size={30} />
            <span className='text-lg font-medium'>Back</span>
          </button>
          <Logo variant='large' />
        </div>
        <section className='mt-8 w-full'>{props.children}</section>
      </div>
      <Notifcation />
    </div>
  );
};

export default BillingLayout;

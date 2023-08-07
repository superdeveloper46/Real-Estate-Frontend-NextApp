import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useSelector } from 'react-redux';

import SkipTraceHeader from '@/components/Pages/SkipTrace/SkipTraceHeader';
import SkipTraceImport from '@/components/Pages/SkipTrace/SkipTraceImport';
import SkipTraceView from '@/components/Pages/SkipTrace/SkipTraceView';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const SkipTracePage = () => {
  const { step } = useSelector((state: any) => state.skipTrace);

  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full bg-[#F5F5F5]'>
        <SkipTraceHeader />
        {step === 0 ? <SkipTraceView /> : <SkipTraceImport />}
      </section>
    </Main>
  );
};

export default SkipTracePage;

export const getServerSideProps = withPageAuthRequired();

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import HomePage from '@/components/Pages/HomePage/HomePage';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <div className='flex h-full w-full text-center align-middle'>
        <HomePage />
      </div>
    </Main>
  );
};

export default Index;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: () =>
    Promise.resolve({
      redirect: {
        destination: '/buyers',
        permanent: false,
      },
    }),
});

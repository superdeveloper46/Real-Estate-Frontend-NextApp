import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Profile from '@/components/Pages/Profile/Profile';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const ProfilePage = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full'>
        <Profile />
      </section>
    </Main>
  );
};

export default ProfilePage;

export const getServerSideProps = withPageAuthRequired();

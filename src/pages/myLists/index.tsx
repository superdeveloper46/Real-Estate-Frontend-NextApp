import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import MyList from '@/components/Pages/MyList/MyList';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const MyListPage = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full'>
        <MyList />
      </section>
    </Main>
  );
};

export default MyListPage;

export const getServerSideProps = withPageAuthRequired();

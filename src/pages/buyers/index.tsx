import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import BuyerView from '@/components/Pages/BuyerView/BuyerView';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const BuyerViewPage = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full'>
        <BuyerView />
      </section>
    </Main>
  );
};

export default BuyerViewPage;

export const getServerSideProps = withPageAuthRequired();

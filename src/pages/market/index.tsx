import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import MapBoxMarketView from '@/components/MapBoxView/MapBoxMarketView.component';
import NavContent from '@/components/Pages/market/NavContent.component';
import NavRight from '@/components/Pages/market/NavRight.component';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const MarketPage = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full'>
        <div className='flex'>
          <MapBoxMarketView className='h-[calc(100vh-40px)] w-[calc(100vw-500px)]' />
          <div className='w-500px flex'>
            <NavContent />
            <NavRight />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default MarketPage;

export const getServerSideProps = withPageAuthRequired();

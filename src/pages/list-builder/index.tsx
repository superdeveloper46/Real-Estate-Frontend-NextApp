import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react';

import Left from '@/components/Pages/ListBuilder/Left/Left.component';
import MyLists from '@/components/Pages/ListBuilder/Lists/MyLists.component';
import Right from '@/components/Pages/ListBuilder/Right/Right.component';
import CommonTab from '@/components/Tab/CommonTab.component';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const tabs = [{ title: 'SEARCH' }, { title: 'MY LISTS' }];

const ListBuilderPage = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full'>
        <CommonTab
          tabs={tabs}
          childComponents={[
            <div key={1} className='flex w-full'>
              <Left />
              <Right />
            </div>,
            <div key={2}>
              <MyLists />
            </div>,
          ]}
        />
      </section>
    </Main>
  );
};

export default ListBuilderPage;

export const getServerSideProps = withPageAuthRequired();

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import BillingSettings from '@/components/Pages/BillingSettings/BillingSettings';
import Main from '@/layouts/Main/Main.layout';
import Meta from '@/layouts/Meta/Meta.layout';
import { AppConfig } from '@/utils/AppConfig';

const BillingSettingsPage = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <section className='w-full'>
        <BillingSettings />
      </section>
    </Main>
  );
};

export default BillingSettingsPage;

export const getServerSideProps = withPageAuthRequired();

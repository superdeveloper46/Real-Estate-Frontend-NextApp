import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Loading from '@/components/LoadingScreen/Loading';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen.component';
import Notifcation from '@/components/Notification/Notifcation';
import Header from '@/layouts/Main/Header.layout';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className='w-full text-gray-700 antialiased'>
      {props.meta}
      <Header />
      <div className='mt-10'>{props.children}</div>
      <Loading />
      <Notifcation />
    </div>
  );
};

export default Main;

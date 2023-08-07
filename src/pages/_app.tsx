import '../styles/global.scss';
import '../styles/billing.scss';
import '../styles/progress.scss';
import '../styles/common-vertical-tab.scss';
import '../styles/rc-slider.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import LoadingScreen from '@/components/LoadingScreen/LoadingScreen.component';
import PageSwitchProgress from '@/components/PageSwitchProgress';
import GlobalMsaProvider from '@/core/context/global-msa/GlobalMsaProvider';
import UserProvider, { useUser } from '@/core/user';
import { store } from '@/redux/store';
import { getToken, setAuthorizationToken } from '@/utils/api/restful/base';

const UserManager = ({ children }: { children: ReactElement }) => {
  const { isLoading } = useUser();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
};

const AuthenticationTokenManager = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getToken()
      .then(setAuthorizationToken)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <GlobalMsaProvider>
        <UserManager>
          <AuthenticationTokenManager>
            <ReduxProvider store={store}>
              <PageSwitchProgress />
              <Component {...pageProps} />
            </ReduxProvider>
          </AuthenticationTokenManager>
        </UserManager>
      </GlobalMsaProvider>
    </UserProvider>
  );
};

export default MyApp;

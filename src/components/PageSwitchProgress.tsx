import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';

import useLatest from '@/utils/hooks/useLatest';

nProgress.configure({ showSpinner: false });

const getBasePath = (path: string) => path.split('?')[0];

const getBasePathWithLocale = (
  path: string,
  currentLocale: string | undefined,
  defaultLocale: string | undefined
) => {
  const localePrefix =
    currentLocale === undefined || currentLocale === defaultLocale
      ? ''
      : `/${currentLocale}`;

  return `${localePrefix}${getBasePath(path)}`;
};

const PageSwitchProgress = () => {
  const router = useRouter();
  const routerRef = useLatest(router);

  useEffect(() => {
    const handleRouteChangeStart = (newPath: string) => {
      const newPageBasePath = getBasePath(newPath);
      const currentPageBasePath = getBasePathWithLocale(
        routerRef.current.asPath,
        routerRef.current.locale,
        routerRef.current.defaultLocale
      );

      if (currentPageBasePath !== newPageBasePath) {
        nProgress.start();
      }
    };

    const handleRouteChangeEnd = () => nProgress.done();

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, []);

  return null;
};

export default PageSwitchProgress;

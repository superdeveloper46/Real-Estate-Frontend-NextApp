import { useRouter } from 'next/router';

import AccountMenu from '@/components/AccountMenu/AccountMenu.component';
import CommonButton from '@/components/Button/Button.component';
import Logo from '@/components/Logo/Logo.component';
import { useUser } from '@/core/user';

// import NotificationMenu from '@/components/NotificationMenu/NotificationMenu';
// import SearchBar from '@/components/SearchBar/SearchBar.component';
import style from './style.module.scss';

const SplitLine = () => {
  return <div className='h-6 w-[1px] bg-white/30'></div>;
};

const Header = () => {
  const { user } = useUser();

  const router = useRouter();

  // const commonLinks = [
  //   { href: '/research', title: 'Research' },
  //   { href: '#', title: 'Features' },
  //   { href: '#', title: 'Pricing' },
  //   { href: '#', title: 'Newsletter' },
  //   { href: '#', title: 'About Us' },
  // ];

  return (
    <nav className={`fixed top-0 z-[100] w-full bg-sfra-blue-300`}>
      <div className='relative mx-3 flex h-10 items-center justify-between'>
        <div className='flex items-center justify-between space-x-4'>
          <Logo color='light' />
          {/* {commonLinks.map((commonLink, index) => (
            <CommonLink
              key={index}
              href={commonLink.href}
              text={commonLink.title}
              variant='inherit'
            />
          ))} */}
        </div>
        <div className='flex w-max items-center space-x-4'>
          {/* <SearchBar /> */}
          {user ? (
            <div className='flex w-max items-center'>
              <SplitLine />
              {/* <NotificationMenu /> */}
              <SplitLine />
              <AccountMenu />
            </div>
          ) : (
            <div className='flex w-max items-center space-x-4'>
              <SplitLine />
              <CommonButton
                text='Sign Up'
                variant='filled'
                classes={style.buttonStyle}
                onClick={() => {
                  router.push('/api/auth/register');
                }}
              />
              <CommonButton
                text='Login'
                variant='outlined'
                classes={style.buttonStyle}
                onClick={() => {
                  router.push('/api/auth/login');
                }}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

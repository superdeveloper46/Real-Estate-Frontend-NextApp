import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type LogoProps = {
  variant?: 'large' | 'medium';
  color?: 'dark' | 'light';
};

const Logo = (props: LogoProps) => {
  const router = useRouter();

  return (
    <div className='flex'>
      <Link href='/' className='w-full border-none'>
        <img
          className={`mx-auto block ${
            props.variant === 'large'
              ? 'h-12'
              : props.variant === 'medium'
              ? 'h-10'
              : 'h-6'
          }`}
          src={`${router.basePath}/logo-${props.color ?? 'dark'}.svg`}
          alt='Your Company'
        />
      </Link>
    </div>
  );
};

export default Logo;

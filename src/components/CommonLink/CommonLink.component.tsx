import Link from 'next/link';
import React from 'react';

type LinkProps = {
  href: string;
  text: string;
  variant?: string;
  classes?: string;
  size?: string;
};

type Variant = {
  [key: string]: string;
};

const variant: Variant = {
  outlined:
    'relative w-auto rounded border border-gray-300 py-2 px-4 text-white hover:border-gray-300 hover:bg-gray-200 justify-center',
  filled:
    'relative w-auto rounded bg-indigo-600 py-2 px-4 text-white hover:border-0 hover:bg-indigo-700 justify-center',
  default:
    'text-white hover:border-b hover:border-b-indigo-700 hover:text-indigo-700 justify-center',
  inherit: 'text-white hover:border-b-0 justify-start',
};

const height: Variant = {
  lg: 'h-12',
  md: 'h-10',
  sm: 'h-8',
};

const CommonLink = (props: LinkProps) => {
  return (
    <Link
      href={props.href}
      className={`mx-auto flex items-center font-montserrat text-ms focus:outline-none
      ${props.variant ? variant[props.variant] : variant.default}
      ${props.size ? height[props.size] : height.md}
      ${props.classes && props.classes} 
      `}
    >
      {props.text}
    </Link>
  );
};

export default CommonLink;

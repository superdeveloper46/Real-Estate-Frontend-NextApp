import React from 'react';

type ImageIconProps = {
  src: string;
  alt: string;
  classes?: string;
  varient?: string;
  size?: string;
};

type Variant = {
  [key: string]: string;
};

const ImageIcon = (props: ImageIconProps) => {
  const varient: Variant = {
    white: 'white-svg',
    blue: 'blue-svg',
    darkBlue: 'darkBlue-svg',
    green: 'green-svg',
    pink: 'pink-svg',
    none: '',
  };
  return (
    <div className='flex  items-center justify-center'>
      <img
        src={props?.src}
        alt={props?.alt}
        className={`${props?.size ? props?.size : 'h-6 w-6'} ${
          props?.classes
        } ${varient[props.varient ? props.varient : 'none']}`}
      />
    </div>
  );
};

export default ImageIcon;

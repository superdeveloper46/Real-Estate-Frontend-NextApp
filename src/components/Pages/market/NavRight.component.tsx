import React, { useState } from 'react';

import styles from './style.module.scss';

const navs = [
  {
    title: 'Overview',
    icon: '/assets/images/market/overView.svg',
  },
  {
    title: 'Demographic',
    icon: '/assets/images/market/demographic.svg',
  },
  {
    title: 'Economics',
    icon: '/assets/images/market/economics.svg',
  },
  {
    title: 'Families',
    icon: '/assets/images/market/families.svg',
  },
  {
    title: 'Housing',
    icon: '/assets/images/market/housing.svg',
  },
  {
    title: 'Social',
    icon: '/assets/images/market/social.svg',
  },
];

const smothView = (e: any, id: string) => {
  e.preventDefault();
  const hero = document.getElementById(id.toLowerCase());
  if (hero !== null) {
    hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const NavItem = (props: {
  title: string;
  icon: string;
  selectedTitle: string;
  setSelectedTitle: (value: string) => void;
}) => {
  return (
    <div
      className='flex cursor-pointer items-center justify-center py-4'
      onClick={(e) => smothView(e, props?.title)}
      onMouseEnter={() => props.setSelectedTitle(props.title)}
      onMouseLeave={() => props.setSelectedTitle('')}
    >
      <div
        className={`group flex h-8 w-8 cursor-pointer items-center justify-center rounded-md ${
          props.selectedTitle === props.title ? 'bg-sfra-blue-100' : ''
        }`}
      >
        <img
          src={props?.icon}
          alt={`${props?.title} icon`}
          className={`h-6 w-6 ${
            props.selectedTitle === props.title ? 'default-white-svg' : ''
          }`}
        />
      </div>
    </div>
  );
};

const NavItemHover = (props: {
  title: string;
  selectedTitle: string;
  setSelectedTitle: (value: string) => void;
}) => {
  return (
    <div
      className='flex items-center justify-end py-4'
      onClick={(e) => smothView(e, props?.title)}
      onMouseEnter={() => props.setSelectedTitle(props.title)}
      onMouseLeave={() => props.setSelectedTitle('')}
    >
      <div
        className={`flex h-8 cursor-pointer items-center justify-center ${
          props.selectedTitle === props.title ? 'text-sfra-blue-100' : ''
        }`}
      >
        <div className='text-ms font-semibold'>{props?.title}</div>
      </div>
    </div>
  );
};

const NavRight = () => {
  const [show, setShow] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  return (
    <div>
      <div className={styles.navRight} onMouseEnter={() => setShow(true)}>
        {navs.map((item, index) => (
          <NavItem
            key={index}
            title={item.title}
            icon={item.icon}
            selectedTitle={selectedTitle}
            setSelectedTitle={setSelectedTitle}
          />
        ))}
      </div>
      <div
        className={`${styles.hoverContainer} ${
          show ? 'right-[60px]' : 'right-[-88px]'
        }`}
        style={{
          transition: 'right 0.5s ease',
        }}
        onMouseLeave={() => setShow(false)}
      >
        {navs.map((item, index) => (
          <NavItemHover
            key={index}
            title={item.title}
            selectedTitle={selectedTitle}
            setSelectedTitle={setSelectedTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default NavRight;

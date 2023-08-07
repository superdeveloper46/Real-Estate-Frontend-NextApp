import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import React, { useState } from 'react';

import styles from './style.module.scss';

const CategoryPanel = () => {
  const categories = [
    {
      title: 'Search Property',
      icon: 'assets/images/homePage/searchProperty.svg',
    },
    {
      title: 'Buyer Search',
      icon: 'assets/images/homePage/buyerSearch.svg',
    },
    {
      title: 'Neighborhood Analytics',
      icon: 'assets/images/homePage/analytics.svg',
    },
    {
      title: 'Rentals',
      icon: 'assets/images/homePage/rentals.svg',
    },
    {
      title: 'Flip Viewer',
      icon: 'assets/images/homePage/flipViewer.svg',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleSelectCategory = (index: number) => {
    // ignore the selection of "Coming Soon" items
    if (categories[index]?.title !== 'Buyer Search') {
      return;
    }

    setSelectedCategory(index);
  };

  return (
    <div className={styles.categoryPanel}>
      {categories.map((item, index) => (
        <Link
          href={item.title === 'Buyer Search' ? '/buyers' : '#'}
          key={index}
        >
          {item.title !== 'Buyer Search' ? (
            <Tooltip
              title={
                <React.Fragment>
                  <span style={{ fontSize: '1.2em' }}>Coming Soon </span>
                </React.Fragment>
              }
              placement='right'
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: '#333',
                    color: '#fff',
                    fontSize: '1.2em',
                    padding: '10px',
                    borderRadius: '4px',
                  },
                },
              }}
            >
              <div
                className={`${styles.categoryItem} group ${
                  selectedCategory === index ? 'activeItem' : ''
                }`}
                onClick={() => handleSelectCategory(index)}
              >
                <img
                  src={item.icon}
                  className={`blue-svg ${
                    selectedCategory === index ? 'activeIcon' : ''
                  }`}
                  alt={`${item.title} icon`}
                />
                <div className='group-hover:text-sfra-blue-100'>
                  {item.title}
                </div>
              </div>
            </Tooltip>
          ) : (
            <div
              className={`${styles.categoryItem} group ${
                selectedCategory === index ? 'activeItem' : ''
              }`}
              onClick={() => handleSelectCategory(index)}
            >
              <img
                src={item.icon}
                className={`blue-svg ${
                  selectedCategory === index ? 'activeIcon' : ''
                }`}
                alt={`${item.title} icon`}
              />
              <div className='group-hover:text-sfra-blue-100'>{item.title}</div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default CategoryPanel;

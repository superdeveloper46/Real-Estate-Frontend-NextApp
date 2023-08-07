import React from 'react';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

import CommonLink from '@/components/CommonLink/CommonLink.component';

const featuresItemsList = [
  {
    href: '',
    text: 'Market Insights',
  },
  {
    href: '',
    text: 'List Builder',
  },
  {
    href: '',
    text: 'Top Buyers',
  },
  {
    href: '',
    text: 'Skip Tracing',
  },
  {
    href: '',
    text: 'Premium Data',
  },
];
const linksItemsList = [
  {
    href: '',
    text: 'About SFR Analytics',
  },
  {
    href: '',
    text: 'Careers',
  },
  {
    href: '',
    text: 'Research',
  },
  {
    href: '',
    text: 'How it works',
  },
  {
    href: '',
    text: 'Pricing',
  },
  {
    href: '',
    text: 'Newsletter',
  },
];
const wwsItemsList = [
  {
    href: '',
    text: 'Consulting',
  },
  {
    href: '',
    text: 'Affiliate Program',
  },
  {
    href: '',
    text: 'Advertising',
  },
  {
    href: '',
    text: 'Venture Funding',
  },
];
const resourcesItemsList = [
  {
    href: '',
    text: 'FAQs',
  },
  {
    href: '',
    text: 'Contact Us',
  },
  {
    href: '',
    text: 'Private Policy',
  },
  {
    href: '',
    text: 'Terms of Service',
  },
];

const Footer = () => {
  return (
    <footer className={`w-full border-t bg-white`}>
      <div className='mx-auto my-14 max-w-screen-xl space-y-20 xl:px-8'>
        <div className='grid grid-cols-4 gap-4 font-inter'>
          <div>
            <div className='text-base font-medium text-gray-700'>Features</div>
            <div className='mt-4 space-y-4'>
              {featuresItemsList.map((item, index) => (
                <CommonLink
                  key={index}
                  href={item.href}
                  text={item.text}
                  variant='inherit'
                />
              ))}
            </div>
          </div>
          <div>
            <div className='text-base font-medium text-gray-700'>Links</div>
            <div className='mt-4 space-y-4'>
              {linksItemsList.map((item, index) => (
                <CommonLink
                  key={index}
                  href={item.href}
                  text={item.text}
                  variant='inherit'
                />
              ))}
            </div>
          </div>
          <div>
            <div className='text-base font-medium text-gray-700'>
              Work With Us
            </div>
            <div className='mt-4 space-y-4'>
              {wwsItemsList.map((item, index) => (
                <CommonLink
                  key={index}
                  href={item.href}
                  text={item.text}
                  variant='inherit'
                />
              ))}
            </div>
          </div>
          <div>
            <div className='text-base font-medium text-gray-700'>Resources</div>
            <div className='mt-4 space-y-4'>
              {resourcesItemsList.map((item, index) => (
                <CommonLink
                  key={index}
                  href={item.href}
                  text={item.text}
                  variant='inherit'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex justify-start space-x-4'>
            <FaTwitter />
            <FaInstagram />
            <FaFacebookSquare />
          </div>
          <div>© 2022 SFR Analytics</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

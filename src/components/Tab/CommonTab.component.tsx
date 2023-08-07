import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useEffect } from 'react';

import TabPanel from './TabPanel.Component';

type CommonTabProps = {
  tabs: Array<{
    title: string;
    icon?: React.ReactElement;
  }>;
  childComponents: React.ReactNode[];
  orientation?: string;
  variant?: string;
  setDefault?: number;
  shadow?: boolean;
};

const CommonTab = (props: CommonTabProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const shadow =
    props?.shadow === undefined
      ? {
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
        }
      : {
          borderBottom: 1,
          borderColor: 'divider',
        };

  useEffect(() => {
    setValue(0);
  }, [props?.setDefault]);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={shadow}>
        <Tabs
          value={value}
          orientation={
            props?.orientation === undefined ? props?.orientation : 'horizontal'
          }
          sx={{
            '& .MuiTabs-scroller': {
              height: '38px',
              minHeight: '38px !important',
            },
            minHeight: '38px !important',
          }}
          onChange={handleChange}
          aria-label='Tab'
          TabIndicatorProps={{
            style: { background: '#3263C9', height: '0.1rem' },
          }}
        >
          {props?.tabs?.map((item, index) => (
            <Tab
              sx={{
                '&.Mui-selected': {
                  color: '#52516A',
                },
                marginLeft: '1rem !important',
                color: '#52516A',
                fontFamily: 'Montserrat',
                fontSize: '0.75rem',
                fontWeight: value === index ? '600' : '500',
                padding: '12px 16px !important',
                minHeight: '38px !important',
              }}
              label={item?.title}
              key={index}
              icon={item?.icon}
              iconPosition='start'
            />
          ))}
        </Tabs>
      </Box>
      {props?.childComponents.map((childComponent, index) => (
        <TabPanel key={index} value={value} index={index}>
          {childComponent}
        </TabPanel>
      ))}
    </Box>
  );
};

export default CommonTab;

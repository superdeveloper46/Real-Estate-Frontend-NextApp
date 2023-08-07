import 'react-tabs/style/react-tabs.css';

import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

type CommonTabProps = {
  headerData: Array<{
    title: string;
    icon?: React.ReactElement;
  }>;
  childComponents: React.ReactNode[];
  type?: string;
};

const CommonTab = (props: CommonTabProps) => {
  return (
    <Tabs
      className={`CommonTab ${
        props.type === 'vertical' && 'CommonVerticalTab'
      }`}
    >
      <TabList>
        {props.headerData.map((header, index) => (
          <Tab key={index}>
            <div
              className={`mx-auto flex ${
                props.type === 'vertical' && 'w-[80%]'
              } items-center justify-between`}
            >
              <div>{header.title}</div>
              {header?.icon}
            </div>
          </Tab>
        ))}
      </TabList>
      {props.childComponents.map((childComponent, index) => (
        <TabPanel key={index}>{childComponent}</TabPanel>
      ))}
    </Tabs>
  );
};

export default CommonTab;

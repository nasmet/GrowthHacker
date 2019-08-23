import React, {
  Component,
} from 'react';
import {
  Tab,
} from '@alifd/next';
import styles from './index.module.scss';
import monitorContentConfig from './monitorContentConfig';

const {
  Item,
} = Tab;

export default function MonitorContent() {
  const rendTab = () => {
    return monitorContentConfig.map((item) => {
      const Content = item.component;
      return (
        <Item
          key={item.key}
          title={item.tab}
        >
          <div>
            <Content />
          </div>
        </Item>
      );
    });
  };

  return (
    <div>
      <Tab defaultActiveKey="GA">
        {rendTab()}
      </Tab>
    </div>
  );
}
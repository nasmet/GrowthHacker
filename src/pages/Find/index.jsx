import React, {
  Component,
} from 'react';
import {
  Tab,
} from '@alifd/next';
import findConfig from './findConfig';

const {
  Item,
} = Tab;

export default function Find() {
  const rendTab = () => {
    return findConfig.map((item) => {
      const Content = item.component;
      return (
        <Item
          key={item.key}
          title={item.tab}
        >
          <Content />
        </Item>
      );
    });
  };

  return (
    <div>
      <Tab defaultActiveKey="hot">
        {rendTab()}
      </Tab>
    </div>
  );
}
import React, {
  Component,
} from 'react';
import {
  Tab,
} from '@alifd/next';
import styles from './index.module.scss';
import analysisContentConfig from './analysisContentConfig';

const {
  Item,
} = Tab;

export default function AnalysisContent() {
  const rendTab = () => {
    return analysisContentConfig.map((item) => {
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
      <Tab defaultActiveKey="SA">
        {rendTab()}
      </Tab>
    </div>
  );
}
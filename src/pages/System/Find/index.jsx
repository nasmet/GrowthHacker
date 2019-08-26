import React, {
  Component,
} from 'react';
import {
  Tab,
} from '@alifd/next';
import findConfig from './findConfig';
import styles from './index.module.scss';

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
          <div className={styles.marginTop10}>
            <Content type={item.type} />
          </div>
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
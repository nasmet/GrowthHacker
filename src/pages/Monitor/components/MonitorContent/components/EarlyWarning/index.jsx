import React, {
  Component,
} from 'react';
import {
  Button,
} from '@alifd/next';
import styles from './index.module.scss';

const earlyWarningConfig = [{
  name: '信息总条数',
  value: '>20万条',
}, {
  name: '信息新增条数',
  value: '>2万条',
}, {
  name: '同比增长率',
  value: '>60%',
}, {
  name: '告警邮件',
  value: 'AAA邮件',
}, {
  name: '告警短信',
  value: '1392222',
}]

export default function EarlyWarning() {
  const renderData = () => {
    return earlyWarningConfig.map((item, index) => {
      return (
        <div className={styles.item} key={index}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      )
    });
  };

  return (
    <div className={styles.wrap}>
      {renderData()}
    </div>
  );
}
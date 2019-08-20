import React, {
  Component,
} from 'react';
import {
  Grid,
  Select,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import styles from './index.module.scss';
import * as filterConfig from './filterConfig';

const {
  Row,
  Col,
} = Grid;

export default function Filter({
  value,
}) {
  return (
    <IceFormBinderWrapper
      value={value}
    >
      <Row wrap gutter="20" className={styles.formRow}>
        <Col l="6">
          <div className={styles.formItem}>
            <span className={styles.formLabel}>排序选择：</span>
            <IceFormBinder triggerType="onBlur" name="orderBy">
              <Select dataSource={filterConfig.basis} />
            </IceFormBinder>
          </div>
        </Col>
        <Col l="6">
          <div>
            <IceFormBinder triggerType="onBlur" name="order">
              <Select dataSource={filterConfig.way} />
            </IceFormBinder>
          </div>
        </Col>
      </Row>
    </IceFormBinderWrapper>
  );
}
import React, {
  Component,
} from 'react';
import styles from './index.module.scss';

export default function Logo({
  text,
}) {
  return (
    <div className={styles.container}>
      <span className={styles.logoText}>{text}</span>
    </div>
  );
}
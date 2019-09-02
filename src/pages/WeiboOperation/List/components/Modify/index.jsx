import React, {
  Component,
  useState,
  useRef,
} from 'react';
import {
  Dialog,
  Button,
  Input,
  Loading,
  Message,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

export default function Modify({
  value,
  onOk,
}) {
  const form = useRef(null);
  const [show, setShow] = useState(false);

  const validateAllFormField = () => {
    form.current.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      setTimeout(() => {
        setShow(true);
        onOk(values);
      }, 500);
    });
  };

  return (
    <Loading visible={show} inline={false}>
      <div className={styles.wrap}>
        <div className={styles.title}>      
          微博名称 {value.name}
        </div>
        <IceFormBinderWrapper value={value} ref={form}>
          <div className={styles.formItem}>
            <div className={styles.formLabel}>代理ip：</div>
            <IceFormBinder name="ip" required message="必填">
              <Input />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="ip" />
            </div>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formLabel}>代理端口：</div>
            <IceFormBinder name="port" required message="必填">
              <Input />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="port" />
            </div>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formLabel}>代理用户：</div>
            <IceFormBinder name="user" required message="必填">
              <Input />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="user" />
            </div>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formLabel}>代理密码：</div>
            <IceFormBinder name="password" required message="必填">
              <Input  />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="password" />
            </div>
          </div>

          <div className={styles.formItem}>
            <div className={styles.formLabel}>代理用户组：</div>
            <IceFormBinder name="group" required message="必填">
              <Input  />
            </IceFormBinder>
            <div className={styles.formError}>
              <IceFormError name="group" />
            </div>
          </div>
      
          <Button type="primary" onClick={validateAllFormField}>
            确定
          </Button>
        </IceFormBinderWrapper>
      </div>
    </Loading>
  );
}
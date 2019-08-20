/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, {
  Component,
} from 'react';
import {
  Nav,
} from '@alifd/next';
import {
  withRouter,
  Link,
} from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import Logo from '../Logo';
import {
  asideMenuConfig,
} from '../../menuConfig';
import './Aside.scss';

const {
  Item,
} = Nav;

function Aside({
  location,
}) {
  const {
    pathname,
  } = location;

  return (
    <div className="aside-custom-menu">
      <Logo text="云图互娱平台" />
      <Nav
        selectedKeys={[pathname]}
        className="ice-menu-custom"
        activeDirection="right"
      >
        {
          asideMenuConfig.map((nav) => {
            return (
              <Item key={nav.path}>
                <Link to={nav.path} className="ice-menu-link">
                  {nav.icon ? (
                    <FoundationSymbol size="small" type={nav.icon} />
                  ) : null}
                  <span className="ice-menu-item-text">{nav.name}</span>
                </Link>
              </Item>
            );
          })}
      </Nav>
    </div>
  );
}

export default withRouter(Aside);
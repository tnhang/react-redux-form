/* eslint no-extra-boolean-cast: 0 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Switch from 'antd/lib/switch';
import Menu from 'antd/lib/menu';

const menus = [
  { path: '/', name: 'Form' },
  { path: '/list', name: 'List' }
]

const AdminLayout = props => {
  const { children } = props;
  const [ showing, setShowing ] = useState(true);

  const page = menus.find(m => m.path === window.location.pathname);

  return (
    <Layout>
      <Layout.Header className='custom-header'>
        <div className='logo'>
          <div className='logo-wrapper'>
            <div className='logo-content'>
              <div className='logo-img' />
              <div className='logo-text'>
                <span>{page?.name}</span>
              </div>
              <div className='logo-switch'>
                <Switch checked={showing} size='small' onChange={value => setShowing(value)} />
              </div>
            </div>
          </div>
        </div>
      </Layout.Header>
      <Layout>
        <Layout.Sider
          breakpoint='xl'
          width={220}
          trigger={null}
          onCollapse = {(collapse, type)=>{
            if (document.body.clientWidth <= 1200 && showing) setShowing(false)
            else if (document.body.clientWidth > 1200 && !showing) setShowing(true)
          }}
          className={`custom-siderbar ${!showing?'hide-sidebar':''}`}
        >
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={window.location.pathname}
          >
            <Menu.ItemGroup
              className='custom-header-group'
            >
              {menus.map(m => 
                <Menu.Item key={m.path}>
                  <Link to={m.path} className='sideMenuItem'>{m.name}</Link>
                </Menu.Item>
              )}
            </Menu.ItemGroup>
          </Menu>
        </Layout.Sider>
        <Layout.Content className='custom-content'>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout;

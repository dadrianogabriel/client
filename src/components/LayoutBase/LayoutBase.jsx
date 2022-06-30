import { Layout, Typography } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Siderbar } from '../Siderbar';
import './style.css';

export const LayoutBase = () => {
  const [colapso, setColapso] = useState(false);

  return (
    <Layout className="layout">
      <Layout.Sider
        width={300}
        collapsible
        collapsed={colapso}
        onCollapse={(value) => setColapso(value)}
      >
        <div className="logo">
          {colapso ? null : (
            <Typography.Title level={2}>
              Funko<span className="span-funko">POP</span>
            </Typography.Title>
          )}
        </div>
        <Siderbar />
      </Layout.Sider>
      <Layout>
        <Layout.Content className="layout-content-margin">
          <Outlet />
        </Layout.Content>
        <Layout.Footer className="footer">
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

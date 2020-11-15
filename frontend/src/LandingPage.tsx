/** @jsx jsx */
import React, { Fragment } from 'react';
import { Global, jsx, css } from '@emotion/react';
import { Layout, Menu, Breadcrumb, Card } from 'antd';

const { Header, Content, Sider } = Layout;
const LandingPageContainer = (props: any) => {
  return (
    <div
      className="px-4 py-2"
      css={css`
        background-image: url('map-background.png');
      `}
    >
      {props.children}
    </div>
  );
};
export const LandingPage = () => {
  return (
    <LandingPageContainer>
      <Global
        styles={css`
          .ant-layout {
            background: none !important;
          }

          .ant-layout-sider.ant-layout-sider-light {
            width: 100% !important;
            min-width: 400px !important;
          }
        `}
      />
      ​<div className="text-lg font-bold">ผลการค้นหาร้านค้า</div>
      <Layout>
        <Sider theme="light">hi1</Sider>

        <Content style={{ margin: '0 2rem 0' }}>
          <Card>hihi</Card>
        </Content>
      </Layout>
    </LandingPageContainer>
  );
};

/** @jsx jsx */
import React, { useState, useEffect, Fragment } from 'react';
import { Global, jsx, css } from '@emotion/react';
import { Layout, Menu, Breadcrumb, Card, Divider, Tag } from 'antd';
import axios from 'axios';

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
const CardDetailContainer = (props: any) => {
  return <div className="p-3">{props.children}</div>;
};
export const LandingPage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    console.log('hihihihi');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log('this.responseText', this.responseText);
        console.log('type', typeof this.responseText);
        setData(JSON.parse(this.responseText));
      }
    };
    xhttp.open('GET', 'https://panjs.com/ywc18.json', true);
    xhttp.send();

    // axios({
    //   method: 'post',
    //   url: `https://panjs.com/ywc18.json`,
    //   headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    // })
    //   .then((data) => {
    //     console.log('data', data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);
  console.log('data', data);
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
          .ant-card-body {
            display: flex;
            padding: 0 !important;
          }
        `}
      />
      ​<div className="text-lg font-bold">ผลการค้นหาร้านค้า</div>
      <Layout>
        <Sider theme="light"></Sider>

        <Content style={{ margin: '0 2rem 0' }}>
          {data?.merchants?.map((merchant: any) => {
            return (
              <Card className="mb-4 p-1">
                <img
                  src={merchant?.coverImageId}
                  width={256}
                  style={{ maxHeight: '256px' }}
                />
                <CardDetailContainer>
                  <div className="flex">
                    {merchant?.shopNameTH}{' '}
                    {merchant?.isOpen !== 'N/A' && (
                      <Tag color={`${merchant?.isOpen === 'Y' ? 'green' : ''}`}>
                        {merchant?.isOpen === 'Y' ? 'เปิดอยู่' : 'ปิดแล้ว'}
                      </Tag>
                    )}
                  </div>
                  <div className="flex">
                    <div>{merchant?.subcategoryName}</div>
                    <div> | {merchant?.priceLevel}</div>
                    <div>
                      |{merchant?.addressDistrictName}{' '}
                      {merchant?.addressProvinceName}
                    </div>
                  </div>
                  <Divider />
                  {merchant?.highlightText}
                  <div className="font-bold">
                    สินค้าแนะนำ:
                    {merchant?.recommendedItems?.map((item: any) => (
                      <span className="mr-1 text-base font-normal">{item}</span>
                    ))}
                  </div>
                </CardDetailContainer>
              </Card>
            );
          })}
        </Content>
      </Layout>
    </LandingPageContainer>
  );
};

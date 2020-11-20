/** @jsx jsx */
import React, { useState, Fragment } from 'react';
import { Global, jsx, css } from '@emotion/react';
import { Layout, Card, Divider, Tag, Select, Spin, Button } from 'antd';

import { CardDetailContainer } from './components/container/CardDetailContainer';
import { LandingPageContainer } from './components/container/LandingPageContainer';
import { Merchant, Category } from './types/type';
import { SideBar } from './components/sidebar/SideBar';
import { SubCategoriesPicker } from './components/sidebar/SubCategoriesPicker';
import { CarOutlined, PhoneOutlined } from '@ant-design/icons';
import { ReactComponent as Dog } from './assets/dog.svg';
import _ from 'lodash';
import DOMPurify from 'dompurify';
import { observer } from 'mobx-react-lite';
import { dataStore } from './stores/dataStore';
import { toJS } from 'mobx';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

enum CategoryType {
  GENERAL = 'ร้านสินค้าทั่วไป',
  FOOD = 'ร้านอาหารและเครื่องดื่ม',
  OTOP = 'ร้านร้านค้า OTOP',
  BLUEFLAG = 'ร้านร้านธงฟ้า',
  ALL = 'ร้านall',
}

const filterFunction = (
  merchant: Merchant,
  category: string | null = null,
  priceRange: number | null = null,
  subCategory: string | null = null,
  area: string | null = null
) => {
  const isInCategory = category
    ? _.includes(category, merchant?.categoryName)
    : true;
  const isInPriceRange = priceRange
    ? priceRange === merchant?.priceLevel
    : true;
  const isInSubCategory = subCategory
    ? _.includes(subCategory, merchant?.subcategoryName)
    : true;
  const isInArea = area
    ? _.includes(area, merchant?.addressProvinceName)
    : true;

  return isInCategory && isInPriceRange && isInSubCategory && isInArea;
};

export const LandingPage = observer(() => {
  const [numberOfContent, setNumberOfContent] = useState<number>(5);

  const PriceLevelTag = (props: any) => {
    const { priceLevel } = props;
    if (priceLevel) {
      return (
        <div>
          {' '}
          |<span className="text-black">{'฿'.repeat(priceLevel)}</span>
          <span className="text-gray-600">{'฿'.repeat(4 - priceLevel)}</span>
        </div>
      );
    } else return <Fragment></Fragment>;
  };

  const clean = DOMPurify.sanitize('<p>aek</p>');

  if (dataStore?.isApiError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">ขออภัย ระบบขัดข้อง</h1>
      </div>
    );
  }
  const length = dataStore.storeData?.merchants?.filter((merchant: Merchant) =>
    // _.includes(filteredCategories?.name, merchant?.categoryName)
    filterFunction(
      merchant,
      dataStore?.storeFilteredCategories?.name,
      dataStore?.storePriceLevel,
      dataStore?.storeFilteredSubCategory,
      dataStore?.storeFilteredProvince
    )
  )?.length;

  return (
    <div
      className="overflow-y-auto"
      css={css`
        background-image: url(${process.env.PUBLIC_URL}/map-background.png);
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        min-height: 90vh;
        @media (min-width: 1048px) {
          height: calc(100vh- 101px);
        }
      `}
    >
      <Global
        styles={css`
          .ant-layout {
            background: none !important;
          }

          .ant-layout-sider.ant-layout-sider-light {
            width: 100% !important;
            min-width: 350px !important;
            height: fit-content;
          }
          .ant-card-body {
            display: flex;
            padding: 0 !important;
            @media (max-width: 1024px) {
              display: block;
            }
          }
          .ant-tag.ant-tag-has-color {
            height: fit-content !important;
          }
          .ant-spin.ant-spin-spinning {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80vh;
          }
          .ant-layout-content {
            @media (max-width: 480px) {
              margin: 0 !important;
            }
          }
        `}
      />

      <Spin spinning={dataStore.loading} />
      {!dataStore.loading && (
        <LandingPageContainer>
          ​<div className="text-lg font-bold mb-8">ผลการค้นหา</div>
          <Layout>
            <Sider
              theme="light"
              className="hidden md:block md:border md:border-gray-500 md:px-4 md:py-4"
            >
              <SideBar
                categories={dataStore?.storeCategories}
                filteredCategories={dataStore?.storeFilteredCategories}
                setFilteredCategories={dataStore?.setStoreFilteredCategories}
                data={dataStore?.storeData}
                setFilteredProvince={dataStore?.setStoreFilteredProvince}
                setPriceLevel={dataStore?.setStorePriceLevel}
                setFilteredSubCategory={dataStore?.setStoreFilteredSubCategory}
              />
            </Sider>
            {length > 0 ? (
              <Content style={{ margin: '0 2rem 0' }}>
                {dataStore.storeData?.merchants
                  ?.filter((merchant: Merchant) =>
                    // _.includes(filteredCategories?.name, merchant?.categoryName)
                    filterFunction(
                      merchant,
                      dataStore?.storeFilteredCategories?.name,
                      dataStore?.storePriceLevel,
                      dataStore?.storeFilteredSubCategory,
                      dataStore?.storeFilteredProvince
                    )
                  )
                  ?.slice(0, numberOfContent)
                  ?.map((merchant: Merchant) => {
                    const cleanHighlightText = DOMPurify.sanitize(
                      merchant?.highlightText
                    );

                    return (
                      <Card className="mb-4 p-1">
                        <img
                          src={merchant?.coverImageId}
                          css={css`
                            object-fit: cover;
                            width: 240px;

                            height: 224px;
                            @media (max-width: 1024px) {
                              max-width: none;
                              max-height: 224px;
                              width: 100%;
                            }
                          `}
                        />
                        <CardDetailContainer>
                          <div className="flex text-lg font-semibold">
                            {merchant?.shopNameTH}
                            {merchant?.isOpen !== 'N/A' && (
                              <Tag
                                color={`${
                                  merchant?.isOpen === 'Y'
                                    ? 'rgb(27 195 0)'
                                    : 'rgb(161 161 161)'
                                }`}
                                className="ml-3 text-xs"
                              >
                                {merchant?.isOpen === 'Y'
                                  ? 'เปิดอยู่'
                                  : 'ปิดแล้ว'}
                              </Tag>
                            )}
                          </div>
                          <div className="flex text-sm text-gray-700 flex-wrap">
                            <div>{merchant?.subcategoryName}</div>
                            {/* <div> | {merchant?.priceLevel}</div> */}
                            <PriceLevelTag priceLevel={merchant?.priceLevel} />
                            <div>
                              |{merchant?.addressDistrictName}{' '}
                              {merchant?.addressProvinceName}
                            </div>
                          </div>
                          <Divider />

                          <div
                            dangerouslySetInnerHTML={{
                              __html: cleanHighlightText,
                            }}
                          />
                          <div className="font-bold text-sm">
                            สินค้าแนะนำ:
                            {merchant?.recommendedItems?.map((item: string) => (
                              <span className="mr-1 text-sm font-normal">
                                {item}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-start items-center">
                            {_.includes(merchant?.facilities, 'ที่จอดรถ') && (
                              <span className="mr-2">
                                <CarOutlined style={{ fontSize: '20px' }} />
                              </span>
                            )}
                            {_.includes(
                              merchant?.facilities,
                              'สามารถนำสัตว์เลี้ยงเข้าได้'
                            ) && (
                              <span className="mr-2 w-6">
                                <Dog />
                              </span>
                            )}
                            {_.includes(
                              merchant?.facilities,
                              'รับจองล่วงหน้า'
                            ) && (
                              <span className="mr-2">
                                <PhoneOutlined style={{ fontSize: '20px' }} />
                              </span>
                            )}
                          </div>
                        </CardDetailContainer>
                      </Card>
                    );
                  })}
                <div className="flex justify-center">
                  <Button
                    className="w-full h-12 rounded text-lg"
                    onClick={() => {
                      setNumberOfContent(numberOfContent + 5);
                    }}
                  >
                    ดูเพิ่มเติม
                  </Button>
                </div>
              </Content>
            ) : (
              <Content>
                <div className="h-screen flex justify-center items-center">
                  <h1 className="text-2xl font-bold">
                    ไม่พบร้านค้าที่ท่านกำลังค้นหา...
                  </h1>
                </div>
              </Content>
            )}
          </Layout>
        </LandingPageContainer>
      )}
    </div>
  );
});

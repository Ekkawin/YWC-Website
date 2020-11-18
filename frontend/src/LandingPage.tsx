/** @jsx jsx */
import React, { useState, useEffect, Fragment } from 'react';
import { Global, jsx, css } from '@emotion/react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Divider,
  Tag,
  Radio,
  Select,
  Spin,
  Rate,
} from 'antd';
import axios from 'axios';
import { CardDetailContainer } from './components/container/CardDetailContainer';
import { LandingPageContainer } from './components/container/LandingPageContainer';
import { Merchant, Category } from './types/type';
import { SideBar } from './components/sidebar/SideBar';
import { SubCategoriesPicker } from './components/sidebar/SubCategoriesPicker';
import { CarOutlined, PhoneOutlined } from '@ant-design/icons';
import { ReactComponent as Dog } from './assets/dog.svg';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
// import { dataStore } from './stores/dataStore';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

enum CategoryType {
  GENERAL = 'สินค้าทั่วไป',
  FOOD = 'อาหารและเครื่องดื่ม',
  OTOP = 'ร้านค้า OTOP',
  BLUEFLAG = 'ร้านธงฟ้า',
  ALL = 'all',
}

const filterFunction = (
  merchant: Merchant,
  category: string | null = null,
  priceRange: number | null = null,
  subCategory: string | null = null,
  area: string | null = null
) => {
  console.log('category', category);
  console.log('priceRange', priceRange);
  console.log('ispro', !priceRange);
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
  console.log('isInCategory && isInPriceRange', isInCategory, isInPriceRange);
  return isInCategory && isInPriceRange && isInSubCategory && isInArea;
};

export const LandingPage = () => {
  //   const {
  //     data,
  //     setData,

  //     merchants,
  //     setMerchants,

  //     categories,
  //     setCategories,

  //     provinces,
  //     setProvinces,

  //     priceLevel,
  //     setPriceLevel,

  //     filteredCategories,
  //     setFilteredCategories,

  //     filteredSubCategory,
  //     setFilteredSubCategory,

  //     filteredProvince,
  //     setFilteredProvince,
  //   } = dataStore;
  const [data, setData] = useState<any>(null);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [priceLevel, setPriceLevel] = useState<number | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<any>(null);
  const [subCategories, setSubCategories] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredSubCategory, setFilteredSubCategory] = useState<any>(null);
  const [filteredProvince, setFilteredProvince] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('https://panjs.com/ywc18.jsonห ')
      .then((data) => {
        setData(data?.data);
        setCategories(data?.data?.categories);

        setFilteredCategories(data?.data?.categories[0]);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  console.log('data', data);
  console.log('categories1', categories);

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

  return (
    <div
      css={css`
        background-image: url('/map-background.png');
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
        `}
      />
      <Spin spinning={isLoading} />
      {!isLoading && merchants?.length !== 0 ? (
        <LandingPageContainer>
          ​<div className="text-lg font-bold">ผลการค้นหาร้านค้า</div>
          <Layout>
            <Sider
              theme="light"
              className="hidden md:block md:border md:border-gray-500 md:px-4 md:py-4"
            >
              <SideBar
                categories={categories}
                filteredCategories={filteredCategories}
                setFilteredCategories={setFilteredCategories}
                data={data}
                setFilteredProvince={setFilteredProvince}
                setPriceLevel={setPriceLevel}
                setFilteredSubCategory={setFilteredSubCategory}
              />
            </Sider>

            <Content style={{ margin: '0 2rem 0' }}>
              {data?.merchants
                ?.filter((merchant: Merchant) =>
                  // _.includes(filteredCategories?.name, merchant?.categoryName)
                  filterFunction(
                    merchant,
                    filteredCategories?.name,
                    priceLevel,
                    filteredSubCategory,
                    filteredProvince
                  )
                )
                ?.map((merchant: Merchant) => {
                  return (
                    <Card className="mb-4 p-1">
                      <img
                        src={merchant?.coverImageId}
                        css={css`
                          object-fit: cover;
                          max-width: 240px;
                          width: 100%;
                          min-height: 224px;
                          @media (max-width: 1024px) {
                            max-width: none;
                            max-height: 224px;
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
                        {merchant?.highlightText}
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
            </Content>
          </Layout>
        </LandingPageContainer>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-2xl font-bold">
            ไม่พบร้านค้าที่ท่านกำลังค้นหา...
          </h1>
        </div>
      )}
    </div>
  );
};

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
} from 'antd';
import axios from 'axios';
import { CardDetailContainer } from './components/container/CardDetailContainer';
import { LandingPageContainer } from './components/container/LandingPageContainer';
import { Merchant, Category } from './types/type';
import { SubCategoriesPicker } from './components/sidebar/SubCategoriesPicker';
import _ from 'lodash';

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
      .get('https://panjs.com/ywc18.json')
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

  return (
    <LandingPageContainer>
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
          }
        `}
      />
      ​<div className="text-lg font-bold">ผลการค้นหาร้านค้า</div>
      <Layout>
        <Sider theme="light">
          <div>ประเภทร้านค้า</div>
          <Radio.Group value={filteredCategories?.name}>
            {categories?.map((category) => (
              <Radio
                style={{ display: 'block', height: '30px', lineHeight: '30px' }}
                value={category?.name}
                onChange={() => {
                  setFilteredCategories(category);
                  console.log('gilteredCategories', filteredCategories);
                }}
              >
                {category?.name}
              </Radio>
            ))}
          </Radio.Group>
          <div>จังหวัดใกล้ฉัน</div>
          <Select
            className="w-full"
            onSelect={(value) => setFilteredProvince(value)}
            allowClear
            onClear={() => {
              setFilteredProvince(null);
            }}
          >
            {data?.provinces?.map((province: string) => {
              return <Option value={province}>{province}</Option>;
            })}
          </Select>
          <div>ราคา</div>
          <Select
            className="w-full"
            onSelect={(e) => {
              setPriceLevel(e as number);
            }}
            allowClear
            onClear={() => {
              setPriceLevel(null);
            }}
          >
            {data?.priceRange?.map((priceRange: string, index: number) => {
              return <Option value={index + 1}>{priceRange}</Option>;
            })}
          </Select>
          <SubCategoriesPicker
            filteredCategories={filteredCategories}
            setFilteredSubCategory={setFilteredSubCategory}
          />
        </Sider>
        <Spin spinning={isLoading} />
        {!isLoading && (
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
                      width={256}
                      style={{ maxHeight: '256px' }}
                    />
                    <CardDetailContainer>
                      <div className="flex">
                        {merchant?.shopNameTH}{' '}
                        {merchant?.isOpen !== 'N/A' && (
                          <Tag
                            color={`${merchant?.isOpen === 'Y' ? 'green' : ''}`}
                          >
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
                        {merchant?.recommendedItems?.map((item: string) => (
                          <span className="mr-1 text-base font-normal">
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardDetailContainer>
                  </Card>
                );
              })}
          </Content>
        )}
      </Layout>
    </LandingPageContainer>
  );
};

import React, { Fragment } from 'react';
import { Layout, Radio, Select } from 'antd';
import { SideBarTitle } from './SideBarTitle';
import { SubCategoriesPicker } from './SubCategoriesPicker';
import { Category } from '../../types/type';

interface Props {
  categories: any;
  filteredCategories: any;
  setFilteredCategories: (categories: any) => void;
  data: any;
  setFilteredProvince: (province: any) => void;
  setPriceLevel: (price: any) => void;
  setFilteredSubCategory: (subctegory: any) => void;
}
const { Sider } = Layout;
const { Option } = Select;

export const SideBar = (props: Props) => {
  const {
    categories,
    filteredCategories,
    setFilteredCategories,
    data,
    setFilteredProvince,
    setPriceLevel,
    setFilteredSubCategory,
  } = props;
  console.log('data in sidebar', data);
  return (
    <Fragment>
      <SideBarTitle>ประเภทร้านค้า</SideBarTitle>
      <Radio.Group value={filteredCategories?.name} className="mt-4 mb-8">
        <Radio
          style={{
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          }}
          onChange={() => {
            setFilteredCategories(null);
          }}
        >
          ทั่วไป
        </Radio>
        {categories?.map((category: any) => (
          <Radio
            style={{
              display: 'block',
              height: '30px',
              lineHeight: '30px',
            }}
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
      <SideBarTitle>จังหวัด/ใกล้ฉัน</SideBarTitle>
      <Select
        className="w-full mt-2 mb-8"
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
      <SideBarTitle>ราคา</SideBarTitle>
      <Select
        className="w-full mt-2 mb-8"
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
    </Fragment>
  );
};

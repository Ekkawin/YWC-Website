/** @jsx jsx */
import React, { Fragment, useState } from 'react';
import { Form, Input, Select, Breadcrumb, Drawer } from 'antd';
import { Global, css, jsx } from '@emotion/react';
import {
  SearchOutlined,
  FilterOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { SideBar } from './components/sidebar/SideBar';
import { observer } from 'mobx-react-lite';
import { dataStore } from './stores/dataStore';
import _ from 'lodash';
import { toJS } from 'mobx';
const { Option } = Select;

export const NavBar = observer(() => {
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <Fragment>
      <Global
        styles={css`
          /* .ant-select-selector {
            border-top-left-radius: 10px !important;
            border-bottom-left-radius: 10px !important;
          } */
          .ant-input-group.ant-input-group-compact > *:last-child {
            border: 0 !important;
          }
          .ant-input-group.ant-input-group-compact > *:first-child {
            border: 0 !important;
          }
          .ant-input-group.ant-input-group-compact > *:not(:last-child) {
            border: 0 !important;
          }
          span.ant-input-group.ant-input-group-compact {
            display: flex;
            align-items: center;
          }
          .ant-drawer-content-wrapper {
            width: 100% !important;
          }
          .ant-drawer-header {
            background-color: #2a4365;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .ant-drawer-title {
            color: #fff !important;
            width: 100%;
          }
          .ant-breadcrumb-link {
            color: white !important;
          }
          .ant-breadcrumb-separator {
            color: white !important;
          }
        `}
      />
      <Form form={form}>
        <div className="flex justify-start items-center mx-4 sm:mx-6 md:mx-12 lg:mx-24 xl:mx-48 py-3">
          <img
            src={`${process.env.PUBLIC_URL}/halfhalf-logo.png`}
            className="hidden md:block md:mr-6 lg:mr-8 xl:mr-10"
            css={css`
              height: 40px !important;
            `}
          />
          <img
            className="mr-4  md:hidden"
            src={`${process.env.PUBLIC_URL}/halfhalf-logo-mini.png`}
            css={css`
              height: 40px !important;
            `}
          />
          <Form.Item className="w-full mb-0">
            <Input.Group compact>
              <Form.Item
                name={['address', 'province']}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select
                  placeholder="จังหวัด"
                  className="hidden sm:block w-24 sm:w-32 md:w-48"
                  onSelect={(value) => {
                    dataStore?.setStoreFilteredProvince(value);
                  }}
                  css={css`
                    .ant-select-selector {
                      border-top-left-radius: 10px !important;
                      border-bottom-left-radius: 10px !important;
                    }
                  `}
                >
                  {dataStore?.storeProvinces?.map((storeProvince: any) => (
                    <Option value={storeProvince}>{storeProvince}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={['address', 'street']}
                noStyle
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Select
                  placeholder="ค้นหาประเภทร้านค้า"
                  className="w-full"
                  onSelect={(value) => {
                    const cat = _.find(dataStore?.storeCategories, {
                      name: value,
                    });

                    dataStore?.setStoreFilteredCategories(cat);
                  }}
                  suffixIcon={
                    <div className="">
                      <SearchOutlined />
                    </div>
                  }
                  css={css`
                    .ant-select-selector {
                      border-top-right-radius: 10px !important;
                      border-bottom-right-radius: 10px !important;
                      @media (max-width: 640px) {
                        border-top-left-radius: 10px !important;
                        border-bottom-left-radius: 10px !important;
                      }
                    }
                  `}
                >
                  {dataStore?.storeCategories?.map((storecat: any) => {
                    return (
                      <Option key={storecat?.name} value={storecat?.name}>
                        {storecat?.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <FilterOutlined
                style={{ fontSize: '24px' }}
                className="w-12 ml-4 md:hidden"
                onClick={() => setIsVisible(true)}
              />
            </Input.Group>
          </Form.Item>
        </div>
        <div
          className="py-2 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 "
          css={css`
            background-color: rgb(39, 57, 124);
          `}
        >
          <Breadcrumb className=" text-white">
            <Breadcrumb.Item href="">หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item href="">ค้นหา</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Form>
      <Drawer
        title={
          <div className="relative flex justify-center">
            <span
              onClick={() => {
                setIsVisible(false);
              }}
              css={css`
                position: absolute;
                left: 5%;
                height: fit-content;
              `}
            >
              <LeftOutlined />
            </span>
            <span>กรอกผล</span>
          </div>
        }
        placement="right"
        closable={false}
        visible={isVisible}
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
      </Drawer>
    </Fragment>
  );
});

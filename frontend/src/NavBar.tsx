/** @jsx jsx */
import React, { Fragment, useState } from 'react';
import { Form, Input, Select, Breadcrumb, Drawer } from 'antd';
import { Global, css, jsx } from '@emotion/react';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { SideBar } from './components/sidebar/SideBar';
const { Option } = Select;

const onFinish = (value: any) => {
  console.log('value', value);
};

const NavBarWrapper = (props: any) => {
  return <div className="px-48 py-2">{props.children}</div>;
};
export const NavBar = () => {
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
          }
        `}
      />
      <Form form={form} onFinish={onFinish}>
        <div className="flex justify-start items-center mx-2 sm:mx-6 md:mx-12 lg:mx-24 xl:mx-48 py-3">
          <img
            src={'/halfhalf-logo.png'}
            className="mr-2 sm:mr-4 md:mr-6 lg:mr-8 xl:mr-10"
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
                  placeholder="Select province"
                  className="hidden sm:block w-24 sm:w-32 md:w-48"
                  css={css`
                    .ant-select-selector {
                      border-top-left-radius: 10px !important;
                      border-bottom-left-radius: 10px !important;
                    }
                  `}
                >
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={['address', 'street']}
                noStyle
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Select
                  placeholder="Input street"
                  className="w-full"
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
                />
              </Form.Item>
              <FilterOutlined
                className="w-12 ml-4 md:hidden"
                onClick={() => setIsVisible(true)}
              />
            </Input.Group>
          </Form.Item>
        </div>
        <div className="bg-blue-700 py-2 px-2 sm:px-6 md:px-12 lg:px-24 xl:px-48 ">
          <Breadcrumb>
            <Breadcrumb.Item href="">หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item href="">ค้นหา</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Form>
      <Drawer
        title="กรอกผล"
        placement="right"
        closable={true}
        onClose={() => {
          setIsVisible(false);
        }}
        visible={isVisible}
      >
        <SideBar
          categories={[]}
          filteredCategories={''}
          setFilteredCategories={() => {}}
          data={''}
          setFilteredProvince={() => {}}
          setPriceLevel={() => {}}
          setFilteredSubCategory={() => {}}
        />
      </Drawer>
    </Fragment>
  );
};

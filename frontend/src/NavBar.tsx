import React from 'react';
import { Form, Input, Select, Breadcrumb } from 'antd';
import { Global, css } from '@emotion/react';

const { Option } = Select;

const onFinish = (value: any) => {
  console.log('value', value);
};

const NavBarWrapper = (props: any) => {
  return <div className="px-48 py-2">{props.children}</div>;
};
export const NavBar = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Global
        styles={css`
          .some-class {
          }
        `}
      />
      <Form form={form} onFinish={onFinish}>
        <div className="flex justify-start items-center mx-48 py-3">
          <img src={'halfhalf-Logo.png'} width={256} className="mr-10" />
          <Form.Item className="w-full mb-0">
            <Input.Group compact>
              <Form.Item
                name={['address', 'province']}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select placeholder="Select province">
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={['address', 'street']}
                noStyle
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Input.Search
                  style={{ width: '80%' }}
                  placeholder="Input street"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </div>
        <div className="bg-blue-700 px-48 py-2">
          <Breadcrumb>
            <Breadcrumb.Item href="">หน้าแรก</Breadcrumb.Item>
            <Breadcrumb.Item href="">ค้นหา</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Form>
    </>
  );
};

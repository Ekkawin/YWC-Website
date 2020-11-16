import React, { Fragment } from 'react';
import { Category } from '../../types/type';
import { Radio } from 'antd';

interface Props {
  filteredCategories: Category;
  setFilteredSubCategory: (subcategory: string) => void;
}

export const SubCategoriesPicker = (props: Props) => {
  const { filteredCategories, setFilteredSubCategory } = props;
  return (
    <Fragment>
      <div>ประเภทของ{filteredCategories?.name}</div>
      <Radio.Group>
        {filteredCategories?.subcategories?.map((subcategory) => (
          <Radio
            value={subcategory}
            style={{ display: 'block', height: '30px', lineHeight: '30px' }}
            onChange={() => {
              setFilteredSubCategory(subcategory);
              console.log('gilteredCategories', filteredCategories);
            }}
          >
            {subcategory}
          </Radio>
        ))}
      </Radio.Group>
    </Fragment>
  );
};

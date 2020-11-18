import { action, autorun, computed, observable } from 'mobx';
class DataStore {
  @observable
  data: any;

  @action
  setData = (data: any) => {
    this.data = data;
  };

  @observable
  merchants: any;

  @action
  setMerchants = (merchants: any) => {
    this.merchants = merchants;
  };

  @observable
  categories: any;
  @action
  setCategories = (categories: any) => {
    this.categories = categories;
  };

  @observable
  provinces: any;

  @action
  setProvinces = (provinces: any) => {
    this.provinces = provinces;
  };

  @observable
  priceLevel: any;
  @action
  setPriceLevel = (priceLevel: any) => {
    this.priceLevel = priceLevel;
  };

  @observable
  filteredCategories: any;
  @action
  setFilteredCategories = (filteredCategories: any) => {
    this.filteredCategories = filteredCategories;
  };

  @observable
  filteredSubCategory: any;

  @action
  setFilteredSubCategory = (filteredSubCategory: any) => {
    this.filteredSubCategory = filteredSubCategory;
  };
  @observable
  filteredProvince: any;
  @action
  setFilteredProvince = (filteredProvince: any) => {
    this.filteredProvince = filteredProvince;
  };
}

export const dataStore = new DataStore();

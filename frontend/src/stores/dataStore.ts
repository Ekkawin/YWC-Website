import { action, autorun, computed, observable } from 'mobx';
class DataStore {
  @observable
  storeData: any;

  @action
  setStoreData = (data: any) => {
    this.storeData = data;
  };

  @observable
  loading: boolean = false;
  @observable
  storeMerchants: any;

  @action
  setStoreMerchants = (merchants: any) => {
    this.storeMerchants = merchants;
  };

  @observable
  storeCategories: any;
  @action
  setStoreCategories = (categories: any) => {
    this.storeCategories = categories;
  };

  @observable
  storeProvinces: any;

  @action
  setStoreProvinces = (provinces: any) => {
    this.storeProvinces = provinces;
  };

  @observable
  storePriceLevel: any;
  @action
  setStorePriceLevel = (priceLevel: any) => {
    this.storePriceLevel = priceLevel;
  };

  @observable
  storeFilteredCategories: any;
  @action
  setStoreFilteredCategories = (filteredCategories: any) => {
    this.storeFilteredCategories = filteredCategories;
  };

  @observable
  storeFilteredSubCategory: any;

  @action
  setStoreFilteredSubCategory = (filteredSubCategory: any) => {
    this.storeFilteredSubCategory = filteredSubCategory;
  };
  @observable
  storeFilteredProvince: any;
  @action
  setStoreFilteredProvince = (filteredProvince: any) => {
    this.storeFilteredProvince = filteredProvince;
  };

  @observable
  isApiError: boolean = false;
}

export const dataStore = new DataStore();

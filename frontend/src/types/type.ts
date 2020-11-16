export interface Category {
  name: string;
  subcategories: string[];
}
export interface Merchant {
  addressDistrictName: string;
  addressProvinceName: string;
  categoryName: string;
  coverImageId: string;
  facilities: string[];
  highlightText: string;
  isOpen: string;
  priceLevel: number;
  recommendedItems: string[];
  shopNameTH: string;
  subcategoryName: string;
}

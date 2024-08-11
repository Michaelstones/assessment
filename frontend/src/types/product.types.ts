export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  category: string;
  material: string[];
  size: TSize[];
  color: TColor[];
}

export type TColor = {
  name: string;
  imgUrl: string;
};

export type TSize = {
  name: string;
  qty: number;
};

export interface ICart {
  id: number | string;
  title: string;
  img: string;
  mat: string;
  col: string;
  size: string;
  price: number;
  qty: number;
}

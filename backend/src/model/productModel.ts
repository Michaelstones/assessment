import mongoose, { Schema, Document } from "mongoose";

export interface TColor {
  name: string;
  imgUrl: string;
}

export interface TSize {
  name: string;
  qty: number;
}

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  category: string;
  material: string[];
  size: TSize[];
  color: TColor[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true },
    category: { type: String, required: true },
    material: [{ type: String, required: true }],
    size: {
      type: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
        },
      ],
      required: true,
    },
    color: {
      type: [
        {
          name: { type: String, required: true },
          imgUrl: { type: String, required: true },
        },
      ],
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model<Product>("Product", ProductSchema);

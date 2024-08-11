import Product, { Product as IProduct } from "../model/productModel";
import { Error } from "mongoose";

export class ProductService {
  public async getAllProducts(): Promise<IProduct[]> {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }

  public async getProductById(id: string): Promise<IProduct | null> {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new Error("Error fetching product by ID");
    }
  }

  public async addProduct(product: IProduct): Promise<IProduct> {
    try {
      const newProduct = new Product(product);
      return await newProduct.save();
    } catch (error) {
      throw new Error("Error adding new product");
    }
  }

  public async updateProduct(
    id: string,
    product: Partial<IProduct>
  ): Promise<IProduct | null> {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      if (!updatedProduct) {
        throw new Error(`Product with id ${id} not found`);
      }
      return updatedProduct;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  public async deleteProduct(id: string): Promise<IProduct | null> {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error(`Product with id ${id} not found`);
      }
      return deletedProduct;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }
}

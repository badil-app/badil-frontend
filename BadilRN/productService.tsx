import axios from "axios";
import { Product } from "./Product";

export const setupAxios = () => {
    axios.defaults.baseURL = "https://badil2.azurewebsites.net/api/v1";
};
export class _ProductsService {
    async getProduct(barcode: string) {
        return await axios.get<Product>(`Products/${barcode}`);
    }

    async getProducts(barcode: string) {
        return (
            await axios.get<Product[]>("Products", {
                params: {
                    barcode: barcode,
                },
            })
        ).data;
    }
}

export const ProductsService = new _ProductsService();

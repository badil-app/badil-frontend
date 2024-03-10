import { Product } from "./Product";

export class ProductsService {
    getProducts(): Product[] {
        // Dummy products data
        const products: Product[] = [
            {
                img: null,
                productName: "Cherry Drink",
                brand: "Pepsi",
                rating: 5,
                nutriScore: "A",
                barcode: "584988881",
            },
            // Add more dummy products as needed
            {
                img: null,
                productName: "Orange Soda",
                brand: "Fanta",
                rating: 4,
                nutriScore: "B",

                barcode: "4985394",
            },
            {
                img: null,
                productName: "Mango Lassi",
                brand: "Charminar",
                rating: 4,
                nutriScore: "C",

                barcode: "67666969",
            },
        ];

        return products;
    }
}

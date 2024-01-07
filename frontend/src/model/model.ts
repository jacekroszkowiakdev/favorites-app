export interface ProductsData {
    products: Product[];
}

export interface Product {
    id: number;
    manufacturer: string;
    year: number;
    model: string;
}

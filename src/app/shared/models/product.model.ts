// Product model class
export class Product {
    product_id: number;
    title: string;
    image_url: string;
    desc: string;
    price: number;
    rating: number;
    location_available: [string];
    category: [string];
    in_stock: boolean;
    is_deleted?: boolean;
}

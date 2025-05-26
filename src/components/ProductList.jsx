import { getProducts } from '@/lib/products';
import ProductListClient from '@/components/ProductListClient';

const ProductList = async ({ filters = {} }) => {
    let products = await getProducts();

    if (filters.category) {
        products = products.filter(p => p.category === filters.category);
    }

    if (filters.min) {
        products = products.filter(p => p.price >= parseFloat(filters.min));
    }

    if (filters.max) {
        products = products.filter(p => p.price <= parseFloat(filters.max));
    }

    if (filters.sort === 'asc') {
        products = products.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'desc') {
        products = products.sort((a, b) => b.price - a.price);
    }

    if (filters.name) {
        const query = filters.name.toLowerCase();
        products = products.filter(p => p.title.toLowerCase().includes(query));
    }

    return (
        <ProductListClient products={products} />
    );
};

export default ProductList;

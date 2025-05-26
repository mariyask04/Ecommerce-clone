// app/categories/page.jsx
"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/products';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import SlideShow from '@/components/SlideShow';

const CategoriesPage = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const router = useRouter();

  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const category = searchParams.get('cat');
  const sort = searchParams.get('sort');
  const name = searchParams.get('name');

  // Fetch products on initial load
  useEffect(() => {
    const products = getProducts();
    setAllProducts(products);
  }, []);

  // Apply filters whenever dependencies change
  useEffect(() => {
    if (!allProducts.length) return;

    let filtered = allProducts.filter((product) => {
      const matchCategory = !category || product.category === category;
      const matchMin = !min || product.price >= parseInt(min);
      const matchMax = !max || product.price <= parseInt(max);
      const matchName = !name || product.name.toLowerCase().includes(name.toLowerCase());

      return matchCategory && matchMin && matchMax && matchName;
    });

    if (sort === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [allProducts, category, min, max, name, sort]);

  const pageTitle = name
    ? `Search results for "${name}"`
    : category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Shop`
    : 'Shop by Category';

  const pageDescription = name
    ? `Search results for "${name}"`
    : `Browse our collection of ${category || 'products'} at great prices.`;

  return (
    <div className="mx-auto px-6">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <SlideShow/>

      <h1 className="text-3xl font-semibold mb-6">{pageTitle}</h1>

      <Filter />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;

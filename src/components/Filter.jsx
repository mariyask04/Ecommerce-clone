'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    setMinPrice(searchParams.get('min') || '');
    setMaxPrice(searchParams.get('max') || '');
    setCategory(searchParams.get('cat') || '');
    setSort(searchParams.get('sort') || '');
  }, [searchParams]);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === 'cat' && value === '') {
      params.delete('cat');
    } else if (value && value.trim() !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceChange = (type, value) => {
    if (value === '' || /^[0-9]*$/.test(value)) {
      if (type === 'min') {
        setMinPrice(value);
        updateQuery('min', value);
      } else {
        setMaxPrice(value);
        updateQuery('max', value);
      }
    }
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">Min Price</label>
            <input
              type="text"
              placeholder="Enter Min Price"
              className="text-lg border border-gray-300 rounded-2xl px-4 py-2 w-full"
              value={minPrice}
              onChange={(e) => handlePriceChange('min', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">Max Price</label>
            <input
              type="text"
              placeholder="Enter Max Price"
              className="text-lg border border-gray-300 rounded-2xl px-4 py-2 w-full"
              value={maxPrice}
              onChange={(e) => handlePriceChange('max', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">Category</label>
            <select
              className="py-2 px-4 rounded-2xl text-lg border border-gray-300 w-full"
              onChange={(e) => {
                setCategory(e.target.value);
                updateQuery('cat', e.target.value);
              }}
              value={category}
            >
              <option value="">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="decor">Home Decor</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-64">
          <label className="block text-sm text-gray-500 mb-1">Sort By</label>
          <select
            className="py-2 px-4 rounded-2xl text-lg border border-gray-300 w-full"
            onChange={(e) => {
              setSort(e.target.value);
              updateQuery('sort', e.target.value);
            }}
            value={sort}
          >
            <option value="">Default</option>
            <option value="asc">Price (low to high)</option>
            <option value="desc">Price (high to low)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;

"use client"

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router=useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
  
    if (name) {
      router.push(`/categories?name=${name}`);
    }
  };
  
  return (
    <form className='flex justify-between gap-4 bg-gray-100 rounded-md flex-1' onSubmit={handleSearch}>
      <input type="text" name="name" placeholder='Search' className='flex-1 bg-transparent outline-none p-1 text-lg'/>
      <button className='cursor-pointer'>
        <Image src="/search.png" width={16} height={16} alt="search"/>
      </button>
    </form>
  )
}

export default SearchBar

import Banner from '@/components/Banner';
import Category from '@/components/Category';
import Products from '@/components/Products';
import React from 'react'

const page = () => {
  return (
    <>
      <Category />
      <Banner />
      <Products />
    </>
  );
};
 
export default page;
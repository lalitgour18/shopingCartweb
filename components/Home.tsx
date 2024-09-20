// components/Products.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/Redux/productsSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to fetch products.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {items.map((product ) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-700">${product.price}</p>
          <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded" />
        </div>
      ))}
    </div>
  );
};

export default Products;

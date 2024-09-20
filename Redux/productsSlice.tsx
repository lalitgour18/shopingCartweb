// store/slices/productsSlice.js

import { Data } from '@/pages/types/dataType';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Define an async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products?limit=100');
  const data = await response.json(); 
  console.log(data.products)
  return data.products; // Return only the products array
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state:any) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state:any) => {
        state.status = 'failed';
      });
  },
});

// Export the async action for use in components
export default productsSlice.reducer;

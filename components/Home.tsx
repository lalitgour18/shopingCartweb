
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/Redux/productsSlice";
import Navbar from "./navbar";

// Carousel Component
const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Auto-slide interval
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // Manually move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  // Manually move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-4">
      {/* Images */}
      {images.length > 0 && (
        <div className="relative h-64 overflow-hidden rounded-lg">
          <img
            src={images[currentSlide].thumbnail}
            alt={images[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-0 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#8592;
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-0 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#8594;
      </button>

      {/* Dots for slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === currentSlide ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [carouselImages, setCarouselImages] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Set carousel images to the first 5 products
  useEffect(() => {
    if (items.length > 0) {
      setCarouselImages(items.slice(0, 5)); // Select first 5 images for the carousel
    }
  }, [items]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to fetch products.</p>;
  }

  return (
    <div className="w-full h-full">
      {/* Sticky Navbar */}
      <div className="mt-0">
        <Navbar/>
      </div>
      <div className=" mt-50 ">
      {/* Image Carousel */}
      <Carousel images={carouselImages} />
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {items.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
            />
            <div className="flex justify-around items-center w-full m-1">
              <button className="px-10 border p-2 bg-gray-800 text-white text-base md:text-lg rounded hover:bg-gray-700 transition duration-300">
                Buy
              </button>

              <button className="px-10 border p-2 bg-gray-800 text-white text-base md:text-lg rounded hover:bg-gray-600 transition duration-300">
                Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

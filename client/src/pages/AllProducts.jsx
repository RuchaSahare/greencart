import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // fallback image

const AllProducts = () => {
  const { products, searchQuery, currency } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col items-start mb-6">
        <p className="text-3xl font-bold uppercase text-gray-800">All Products</p>
        <div
          className="w-20 h-1 rounded-full mt-1"
          style={{ backgroundColor: "var(--color-primary)" }}
        ></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product) => {
            const productImage =
              Array.isArray(product.image) && product.image.length > 0
                ? `${import.meta.env.VITE_BACKEND_URL || "https://greencart-flcw.onrender.com"}/${product.image[0]}`
                : typeof product.image === "string"
                ? `${import.meta.env.VITE_BACKEND_URL || "https://greencart-flcw.onrender.com"}/${product.image}`
                : assets.default_image;

            return (
              <div
                key={product._id}
                onClick={() =>
                  navigate(
                    `/products/${product.category?.toLowerCase()}/${product._id}`
                  )
                }
                className="rounded-lg shadow hover:shadow-lg transition-all duration-300 flex flex-col items-center p-4 bg-white cursor-pointer"
              >
                {/* Image */}
                <div className="w-full h-40 flex justify-center items-center overflow-hidden rounded-lg bg-gray-50">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={product.name}
                      className="object-contain h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>

                {/* Product Info */}
                <h3 className="mt-3 text-center font-semibold text-lg truncate w-full">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">{product.category}</p>

                <p
                  className="mt-1 text-sm font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {currency}
                  {Number(product.offerPrice).toFixed(2)}
                  {product.price !== product.offerPrice && (
                    <span className="text-gray-400 line-through ml-1 text-xs">
                      {currency}
                      {Number(product.price).toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllProducts;
import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const PublicCard = ({ 
  image, 
  title, 
  price, 
  originalPrice, 
  discount, 
  rating = 4.5,
  reviews = 5 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="text-sm text-gray-600 ml-1 font-medium">
          {rating}<span className="text-gray-400">/{reviews}</span>
        </span>
      </div>
    );
  };

  return (
    <div 
      className="group relative w-full max-w-[260px] bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isLiked ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            <Heart 
              className="w-4 h-4" 
              fill={isLiked ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Add to Cart Button - Shows on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <button className="w-full bg-black text-white py-3 font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Rating */}
        <div className="mb-3">
          {renderStars()}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-lg text-gray-400 line-through font-medium">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Example usage component showing multiple cards
const ProductCardShowcase = () => {
  const products = [
    {
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      title: 'T-shirt with Tape Details',
      price: 120,
      rating: 4.5,
      reviews: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      title: 'Skinny Fit Jeans',
      price: 240,
      originalPrice: 260,
      discount: 20,
      rating: 3.5,
      reviews: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      title: 'Checkered Shirt',
      price: 180,
      rating: 4.5,
      reviews: 5
    },
    {
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
      title: 'Sleeve Striped T-shirt',
      price: 130,
      originalPrice: 160,
      discount: 30,
      rating: 4.5,
      reviews: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">New Arrivals</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicCard;
export { ProductCardShowcase };
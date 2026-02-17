import ProductsPreviewSection from "../../components/ProductsPreviewSection";

export default function () {
  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      title: "T-shirt with Tape Details",
      price: 120,
      rating: 4.5,
      reviews: 5,
    },
    {
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      title: "Skinny Fit Jeans",
      price: 240,
      originalPrice: 260,
      discount: 20,
      rating: 3.5,
      reviews: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      title: "Checkered Shirt",
      price: 180,
      rating: 4.5,
      reviews: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
      title: "Sleeve Striped T-shirt",
      price: 130,
      originalPrice: 160,
      discount: 30,
      rating: 4.5,
      reviews: 5,
    },
  ];
  return (
    <div className="w-full">
      {
        <ProductsPreviewSection
          Title="Top Salles"
          Cards={products}
          
        />
      }
    </div>
  );
}

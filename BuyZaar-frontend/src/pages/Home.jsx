import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { getAllCategories } from "../services/categoryService";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(); // fetch all
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#FBF7F3]">
      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-10">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#7A2E0E]">
            Welcome to BuyZaar
          </h1>
          <p className="text-gray-600 max-w-xl">
            Discover curated products chosen for quality and value — your
            one-stop shop for everything.
          </p>
          <div className="mt-4">
            <Link to="/products" className="inline-block">
              <button className="bg-[#FF8A65] text-white px-6 py-3 rounded-lg shadow-sm hover:opacity-95 transition">
                Shop Now
              </button>
            </Link>
            <button
              onClick={() => navigate("/products")}
              className="ml-3 bg-white border border-gray-200 text-[#7A2E0E] px-4 py-2 rounded-lg shadow-sm hover:bg-[#FFF6F2] transition"
            >
              Explore
            </button>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <img
              src="/placeholder-hero.jpg"
              alt="hero"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#7A2E0E] mb-3">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category) => (
            <div
              key={category._id}
              onClick={() => navigate(`/products?category=${category._id}`)}
              className="cursor-pointer bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-center text-center"
            >
              <h3 className="text-sm font-medium text-gray-700">
                {category.name}
              </h3>
            </div>
          ))}

          <div
            onClick={() => navigate("/products")}
            className="cursor-pointer bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-center text-center"
          >
            <h3 className="text-sm font-medium text-gray-600">View More</h3>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section>
        <h2 className="text-2xl font-semibold text-[#7A2E0E] mb-3">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="w-full h-48 bg-gray-100">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  ₹{product.discountPrice || product.price}
                </p>
                <Link to={`/products/${product._id}`}>
                  <button className="text-sm bg-[#FF8A65] text-white px-4 py-2 rounded-md">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProducts } from "../services/productService";

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [minRating, setMinRating] = useState("");

  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    applyFilters();
  }, [
    allProducts,
    minPrice,
    maxPrice,
    sortOption,
    selectedSubcategory,
    minRating,
    searchQuery,
  ]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(categoryId);
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const applyFilters = () => {
    let updated = [...allProducts];

    // Search filtering
    if (searchQuery) {
      updated = updated.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Subcategory filtering
    if (selectedSubcategory) {
      updated = updated.filter(
        (product) => product.subcategory._id === selectedSubcategory,
      );
    }

    // Rating filtering
    if (minRating) {
      updated = updated.filter(
        (product) => product.averageRating >= Number(minRating),
      );
    }

    // Price filtering
    if (minPrice) {
      updated = updated.filter((product) => product.price >= Number(minPrice));
    }

    if (maxPrice) {
      updated = updated.filter((product) => product.price <= Number(maxPrice));
    }

    // Sorting
    if (sortOption === "price_asc") {
      updated.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price_desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "rating_desc") {
      updated.sort((a, b) => b.averageRating - a.averageRating);
    }

    if (sortOption === "rating_price") {
      updated.sort((a, b) => {
        if (b.averageRating === a.averageRating) {
          return a.price - b.price;
        }
        return b.averageRating - a.averageRating;
      });
    }

    setFilteredProducts(updated);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] scroll-smooth p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-[#7A2E0E]">Products</h1>
          <p className="text-sm text-gray-600">Browse our curated selection</p>
        </header>

        {/* FILTERS */}
        <div className="mb-6 bg-white/60 backdrop-blur rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200 w-full md:w-40"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200 w-full md:w-40"
            />

            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200 w-full md:w-40"
            >
              <option value="">Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200 w-full md:w-48"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Rating: High to Low</option>
              <option value="rating_price">Rating High + Price Low</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-full h-48 bg-gray-100">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-medium text-gray-800 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">
                        ⭐ {product.averageRating ?? "-"}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="text-xl font-semibold text-[#FF8A65]">
                        ₹{product.discountPrice || product.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Link to={`/products/${product._id}`} className="flex-1">
                      <button className="w-full bg-[#FF8A65] text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-95 transition">
                        View
                      </button>
                    </Link>

                    <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

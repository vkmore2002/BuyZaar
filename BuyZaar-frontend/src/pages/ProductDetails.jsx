import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import { addToCart } from "../services/cartService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-500">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-600">Product not found.</div>
    );
  }

  const {
    name,
    price,
    discountPrice,
    stock,
    longDescription,
    images = [],
    subcategory,
  } = product;

  const displayPrice = discountPrice || price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#FBF7F3]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* image gallery */}
        <div className="space-y-4">
          <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {images.length ? (
              <img
                src={images[activeImage]}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 rounded-md overflow-hidden border ${
                    idx === activeImage ? "border-[#FF8A65]" : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-[#7A2E0E]">{name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-[#FF8A65]">
              ₹{displayPrice}
            </span>
            {discountPrice && (
              <span className="text-sm line-through text-gray-500">
                ₹{price}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600">
            Stock: {stock > 0 ? stock : "Out of stock"}
          </div>
          <div className="text-sm text-gray-700">
            Category: {subcategory?.name}
          </div>

          <p className="text-gray-800 leading-relaxed">{longDescription}</p>

          <button
            onClick={async () => {
              if (!user) {
                navigate("/login");
                return;
              }

              try {
                await addToCart(product._id, 1, user.token);
                alert("Added to cart successfully");
              } catch (err) {
                console.error("Error adding to cart", err);
                alert(err.response?.data?.message || "Failed to add to cart");
              }
            }}
            disabled={stock === 0}
            className={`w-full md:w-auto bg-[#FF8A65] text-white px-6 py-3 rounded-lg shadow-sm hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {stock === 0 ? "Sold out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

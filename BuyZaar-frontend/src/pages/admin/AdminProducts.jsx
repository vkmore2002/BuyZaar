import { useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../services/productService";
import { getAllSubcategories } from "../../services/subcategoryService";
import { useAuth } from "../../context/AuthContext";

function AdminProducts() {
  const { user } = useAuth();
  const token = user?.token;

  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    discountPrice: "",
    stock: "",
    subcategory: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchSubcategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const data = await getAllSubcategories();
      setSubcategories(data);
    } catch (err) {
      console.error("Error fetching subcategories", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      shortDescription: "",
      longDescription: "",
      price: "",
      discountPrice: "",
      stock: "",
      subcategory: "",
    });
    setImages([]);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const {
      name,
      shortDescription,
      longDescription,
      price,
      stock,
      subcategory,
    } = formData;

    if (
      !name ||
      !shortDescription ||
      !longDescription ||
      !price ||
      !stock ||
      !subcategory
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", name);
      data.append("shortDescription", shortDescription);
      data.append("longDescription", longDescription);
      data.append("price", price);
      data.append("discountPrice", formData.discountPrice);
      data.append("stock", stock);
      data.append("subcategory", subcategory);

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      if (editingId) {
        await updateProduct(editingId, data, token);
      } else {
        if (images.length === 0) {
          alert("Please upload at least one image");
          return;
        }
        await createProduct(data, token);
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Error saving product", err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      price: product.price,
      discountPrice: product.discountPrice || "",
      stock: product.stock,
      subcategory: product.subcategory?._id,
    });

    setImages([]);
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert("You must be logged in to delete a product");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await deleteProduct(id, token);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete product";
      alert(`Error deleting product: ${errorMessage}`);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-[#7A2E0E]">
          Manage Products
        </h2>
        <p className="text-sm text-gray-500">
          Create, edit and remove products
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="space-y-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full px-3 py-2 rounded-md border border-gray-200"
            />

            <input
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Short Description"
              className="w-full px-3 py-2 rounded-md border border-gray-200"
            />

            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              placeholder="Long Description"
              className="w-full px-3 py-2 rounded-md border border-gray-200 h-24"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="px-3 py-2 rounded-md border border-gray-200"
              />
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="Discount Price (Optional)"
                className="px-3 py-2 rounded-md border border-gray-200"
              />
            </div>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full px-3 py-2 rounded-md border border-gray-200"
            />

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full"
            />

            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-200"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name} ({sub.category?.name})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className="bg-[#FF8A65] text-white px-4 py-2 rounded-md shadow-sm"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="px-3 py-2 rounded-md border border-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="py-2">Product</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Stock</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Images</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-[#FFF6F2] transition"
                  >
                    <td className="py-3 font-medium">{product.name}</td>
                    <td className="py-3">₹{product.price}</td>
                    <td className="py-3">{product.stock}</td>
                    <td className="py-3">
                      {product.subcategory?.category?.name}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {product.images?.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt="product"
                            className="w-16 h-12 object-cover rounded"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1 rounded-md bg-yellow-50 text-yellow-700 border border-yellow-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1 rounded-md bg-red-50 text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;

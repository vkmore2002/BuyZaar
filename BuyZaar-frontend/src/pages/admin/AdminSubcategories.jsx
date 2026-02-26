import { useEffect, useState } from "react";
import {
  getAllSubcategories,
  createSubcategory,
  deleteSubcategory,
} from "../../services/subcategoryService";
import { getAllCategories } from "../../services/categoryService";
import { useAuth } from "../../context/AuthContext";

function AdminSubcategories() {
  const { user } = useAuth();
  const token = user?.token;

  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories", err);
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

  const handleAddSubcategory = async () => {
    if (!name || !selectedCategory) return;

    try {
      await createSubcategory({ name, category: selectedCategory }, token);
      setName("");
      setSelectedCategory("");
      fetchSubcategories();
    } catch (err) {
      console.error("Error creating subcategory", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubcategory(id, token);
      fetchSubcategories();
    } catch (err) {
      console.error("Error deleting subcategory", err);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-[#7A2E0E]">
          Manage Subcategories
        </h2>
        <p className="text-sm text-gray-500">
          Organize subcategories under categories
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3">
            <input
              className="px-3 py-2 rounded-md border border-gray-200 outline-none"
              placeholder="Subcategory Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select
              className="px-3 py-2 rounded-md border border-gray-200 outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div>
              <button
                onClick={handleAddSubcategory}
                className="bg-[#FF8A65] text-white px-4 py-2 rounded-md shadow-sm hover:opacity-95 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="py-2">Subcategory</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subcategories.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-t hover:bg-[#FFF6F2] transition"
                  >
                    <td className="py-3">{sub.name}</td>
                    <td className="py-3">{sub.category?.name}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="text-red-500 bg-red-50 px-3 py-1 rounded-md text-sm hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
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

export default AdminSubcategories;

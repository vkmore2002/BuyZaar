import { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../../services/categoryService";
import { useAuth } from "../../context/AuthContext";

function AdminCategories() {
  const { user } = useAuth();
  const token = user?.token;

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      console.log("TOKEN:", token);
      await createCategory(newCategory, token);
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Error creating category", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id, token);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category", err);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-[#7A2E0E]">
          Manage Categories
        </h2>
        <p className="text-sm text-gray-500">
          Create and organize product categories
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm text-gray-600 mb-2">
            New Category
          </label>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-md border border-gray-200 outline-none"
              type="text"
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              onClick={handleAddCategory}
              className="bg-[#FF8A65] text-white px-4 py-2 rounded-md shadow-sm hover:opacity-95 transition"
            >
              Add
            </button>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="py-2">Name</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-t hover:bg-[#FFF6F2] transition"
                  >
                    <td className="py-3">{category.name}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
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

export default AdminCategories;

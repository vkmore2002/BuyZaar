import { Link, Outlet, useLocation } from "react-router-dom";

function DashboardLayout() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "overview") {
      return (
        location.pathname === "/dashboard" ||
        location.pathname.includes("overview")
      );
    }
    return location.pathname.includes(path);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F3] text-gray-800">
      <div className="md:flex md:items-start">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white rounded-r-xl p-6 shadow-sm sticky top-6 h-[calc(100vh-48px)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FFEDE0] flex items-center justify-center text-[#7A2E0E] font-semibold">
              B
            </div>
            <div>
              <div className="text-sm font-semibold">BuyZaar Admin</div>
              <div className="text-xs text-gray-500">admin</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 mt-3">
            <Link
              to="overview"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive("overview") ? "bg-[#FFF3EB] text-[#7A2E0E] border-l-4 border-[#FF8A65]" : "text-gray-700 hover:bg-[#FFF6F2]"}`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FFB59A]"></span>
              <span>Overview</span>
            </Link>

            <Link
              to="categories"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive("categories") ? "bg-[#FFF3EB] text-[#7A2E0E] border-l-4 border-[#FF8A65]" : "text-gray-700 hover:bg-[#FFF6F2]"}`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FFB59A]"></span>
              <span>Categories</span>
            </Link>

            <Link
              to="subcategories"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive("subcategories") ? "bg-[#FFF3EB] text-[#7A2E0E] border-l-4 border-[#FF8A65]" : "text-gray-700 hover:bg-[#FFF6F2]"}`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FFB59A]"></span>
              <span>Subcategories</span>
            </Link>

            <Link
              to="products"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive("products") ? "bg-[#FFF3EB] text-[#7A2E0E] border-l-4 border-[#FF8A65]" : "text-gray-700 hover:bg-[#FFF6F2]"}`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FFB59A]"></span>
              <span>Products</span>
            </Link>

            <Link
              to="orders"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive("orders") ? "bg-[#FFF3EB] text-[#7A2E0E] border-l-4 border-[#FF8A65]" : "text-gray-700 hover:bg-[#FFF6F2]"}`}
            >
              <span className="w-3 h-3 rounded-full bg-[#FFB59A]"></span>
              <span>Orders</span>
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 px-4 md:px-8 py-6">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#7A2E0E]">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500">Overview and management</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center bg-white rounded-lg px-3 py-1 shadow-sm border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  placeholder="Search admin"
                  className="outline-none text-sm bg-transparent"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFEDE0] flex items-center justify-center text-[#7A2E0E]">
                  A
                </div>
              </div>
            </div>
          </header>

          <div className="bg-white rounded-2xl p-6 shadow-md min-h-[64vh]">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

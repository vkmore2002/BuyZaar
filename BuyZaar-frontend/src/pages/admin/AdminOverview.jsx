import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border-l-4 border-transparent hover:border-[#FF8A65]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFF0E6] text-[#7A2E0E]">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
    </div>
  );
}

function AdminOverview() {
  const { user } = useAuth();
  const token = user?.token;

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats(token);
      setStats(data);
    } catch (err) {
      console.error("Error fetching dashboard stats", err);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#7A2E0E]">Overview</h2>
          <p className="text-sm text-gray-500">Quick summary of key metrics</p>
        </div>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4z" />
              </svg>
            }
          />

          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 3h14v2H3V3z" />
              </svg>
            }
          />

          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 4a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            }
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.totalRevenue}`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" />
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
}

export default AdminOverview;

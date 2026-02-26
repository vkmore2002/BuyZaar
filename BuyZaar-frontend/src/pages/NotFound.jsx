import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F2] p-6">
      <div className="max-w-2xl w-full text-center bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="text-[96px] font-extrabold text-[#FFEDE6] leading-none -mt-6">
          404
        </div>

        <div className="mt-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FF8A65]/10 text-[#FF8A65] rounded-full text-4xl shadow-sm mx-auto">
            🤷
          </div>
        </div>

        <h1 className="mt-6 text-2xl md:text-3xl font-semibold text-[#7A2E0E]">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          We couldn't find the page you're looking for. It may have been moved
          or removed.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#FF8A65] text-white px-5 py-2 rounded-lg shadow hover:opacity-95 transition"
          >
            Go Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          If you think this is an error, contact support.
        </div>
      </div>
    </div>
  );
}

export default NotFound;

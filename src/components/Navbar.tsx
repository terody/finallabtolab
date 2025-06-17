import {
  Briefcase,
  Building2,
  LogIn,
  ShoppingBag,
  TestTube2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TestTube2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Lab to Lab
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/directory"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
            >
              <Building2 className="h-5 w-5" />
              <span>Directory</span>
            </Link>
            <Link
              to="/community"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
            >
              <Users className="h-5 w-5" />
              <span>Community</span>
            </Link>
            <Link
              to="/marketplace"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Marketplace</span>
            </Link>
            <Link
              to="/jobs"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
            >
              <Briefcase className="h-5 w-5" />
              <span>Jobs</span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {profile?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link
          to={token ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <Bot size={28} />

          <span className="text-2xl font-bold">
            Inventra AI
          </span>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-8">

          {token ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-cyan-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-3"
              >
                {/* Avatar */}

                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-cyan-500
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-lg
                    border-2
                    border-cyan-300
                  "
                >
                  {user?.avatar || "U"}
                </div>

                {/* Username */}

                <span className="font-medium">
                  {user?.username}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  hover:bg-red-600
                  px-5
                  py-2
                  rounded-lg
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="hover:text-cyan-400 transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="hover:text-cyan-400 transition"
              >
                About
              </Link>

              <Link
                to="/login"
                className="hover:text-cyan-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-cyan-500
                  hover:bg-cyan-600
                  px-4
                  py-2
                  rounded-lg
                  transition
                "
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
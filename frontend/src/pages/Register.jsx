import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-slate-500/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-80px] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.07] blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl px-8 py-10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-extrabold text-base text-white">
              I
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">
              Inventra<span className="text-cyan-400">AI</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-white font-extrabold text-3xl tracking-tight mb-1">
            Create account
          </h1>
          <p className="text-white/40 text-sm mb-8">
            Join Inventra AI and manage smarter
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name + Username — side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/40 tracking-widest mb-2">FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Sparsh Tiwari"
                  onChange={handleChange}
                  value={formData.fullName}
                  required
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/60 focus:bg-white/[0.07] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/40 tracking-widest mb-2">USERNAME</label>
                <input
                  type="text"
                  name="username"
                  placeholder="sparsh10t"
                  onChange={handleChange}
                  value={formData.username}
                  required
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/60 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/40 tracking-widest mb-2">EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={formData.email}
                required
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/60 focus:bg-white/[0.07] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-white/40 tracking-widest mb-2">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/60 focus:bg-white/[0.07] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-xs"
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold text-sm mt-2 hover:shadow-[0_0_28px_rgba(6,182,212,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : "Create Account"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-white/20 text-xs">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Login link */}
          <p className="text-center text-white/40 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
              Sign in
            </Link>
          </p>

        </div>

        {/* Footer */}
        <p className="text-center text-white/15 text-xs mt-6">
          © 2026 Inventra AI. All Rights Reserved.
        </p>

      </div>
    </div>
  );
};

export default Register;
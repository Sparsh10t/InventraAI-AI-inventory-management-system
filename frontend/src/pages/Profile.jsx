import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AIChatModal from "../components/AIChatModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      setFormData({
        fullName: response.data.user.fullName,
        username: response.data.user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess("");
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8000/api/users/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      setError("Update failed. Please try again.");
    }
    setLoading(false);
  };

  // Avatar initials
  const getInitials = () => {
    if (!user) return "?";
    const name = user.fullName || user.username || user.email || "";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-[rgb(2,8,20)] min-h-screen text-white font-sans">
      <Sidebar setShowChat={setShowChat} />

      <div className="ml-60 p-8">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-lg">
            👤
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">My Profile</h1>
            <p className="text-white/35 text-xs">Manage your account details</p>
          </div>
        </div>

        {!user ? (
          /* ── Skeleton ── */
          <div className="max-w-2xl space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white/[0.06] rounded-2xl animate-pulse h-24" />
            ))}
          </div>
        ) : (
          <div className="max-w-2xl space-y-5">

            {/* ── Avatar Card ── */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex items-center gap-5">
              {/* Avatar circle */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-2xl font-extrabold text-white shrink-0">
                {getInitials()}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{user.fullName || user.username}</p>
                <p className="text-white/40 text-sm">@{user.username}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                    Active
                  </span>
                  <span className="text-white/25 text-xs">
                    Joined {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Info Card ── */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-semibold text-white/30 tracking-widest mb-4">ACCOUNT INFO</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                  <span className="text-white/40 text-sm">Email</span>
                  <span className="text-white text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
                  <span className="text-white/40 text-sm">Username</span>
                  <span className="text-white text-sm font-medium">@{user.username}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white/40 text-sm">Member Since</span>
                  <span className="text-white text-sm font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Edit Form ── */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-xs font-semibold text-white/30 tracking-widest mb-5">EDIT PROFILE</p>

              {/* Success / Error */}
              {success && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  ✓ {success}
                </div>
              )}
              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/35 tracking-widest mb-2">FULL NAME</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/35 tracking-widest mb-2">USERNAME</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Your username"
                    className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold text-sm hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : "Save Changes"}
                </button>
              </form>
            </div>

          </div>
        )}
      </div>

      <AIChatModal show={showChat} setShow={setShowChat} />
    </div>
  );
};

export default Profile;
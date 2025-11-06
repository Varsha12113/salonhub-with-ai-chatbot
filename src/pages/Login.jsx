import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - animated salon image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center bg-gradient-to-br from-purple-200 via-pink-100 to-purple-300 relative overflow-hidden">
    
    <video
      className="absolute inset-0 w-full h-full object-cover opacity-90"
      src="/assets/videos/loginleftvideo.mp4"  
      autoPlay
      loop
      muted
      playsInline
    ></video>

    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 via-pink-300/40 to-transparent"></div>

    <h1 className="relative z-10 text-white text-4xl md:text-7xl font-serif text-center px-6 drop-shadow-lg tracking-wide">
  Revive Your Glow  <br />
  <span className="text-pink-100 md:text-3xl font-light italic">
    Beauty starts with confidence
  </span>
</h1>

  </div>


      {/* Right side - login form */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-purple-200 via-pink-100 to-purple-400 p-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.3)]">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700">
            Welcome ✨
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Login to your salon account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Enter Email or Username
    </label>
    <input
  type="text"
  name="username"
  placeholder="Enter email or username"
  value={formData.username || ""}
  onChange={handleChange}
  className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition"
  required
/>
  </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-purple-600 transition"
              >
                {showPassword ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-500 hover:shadow-lg transition-transform duration-300 transform hover:scale-[1.02]"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>

          {error && (
  <p className="text-red-500 text-center text-sm mt-4 bg-red-50 py-2 rounded-lg border border-red-200">
    {error.error || error.message || "Something went wrong"}
  </p>
)}

        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2:""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

useEffect(() => {
  setFormData({ name: "", email: "", password: "", password2: "" });
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

  // ✅ Confirm password validation
  if (formData.password !== formData.password2) {
    alert("Passwords do not match!");
    return;
  }

  // Prepare payload (optional: remove password2)
  const payload = {
    username: formData.name,
    email: formData.email,
    password: formData.password,
    password2:formData.password2
  };

  dispatch(registerUser(payload))
    .unwrap()
    .then(() => {
       setFormData({ name: "", email: "", password: "", password2: "" });
      alert("Registration successful!");
      navigate("/login");
    })
    .catch((err) => alert(err.message || "Registration failed"));
  };

  // // ------------------- GOOGLE LOGIN -------------------
  // useEffect(() => {
  //   /* global google */
  //   if (window.google) {
  //     google.accounts.id.initialize({
  //       client_id: "YOUR_GOOGLE_CLIENT_ID", // ⬅️ Replace with your Google Client ID
  //       callback: handleGoogleResponse,
  //     });

  //     google.accounts.id.renderButton(
  //       document.getElementById("googleSignUp"),
  //       { theme: "outline", size: "large", width: "100%" }
  //     );
  //   }
  // }, []);

  // const handleGoogleResponse = async (response) => {
  //   const token = response.credential;
  //   console.log("Google JWT Token:", token);

  //   // Optional: send token to backend to register/login user
  //   // Example:
  //   // const res = await axios.post("/api/auth/google-register", { token });
  //   // dispatch(setUser(res.data.user));
  //   // navigate("/dashboard");

  //   alert("Google signup token received. Implement backend logic next!");
  // };
  // // -----------------------------------------------------

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{
        backgroundImage:
          "url('')",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all duration-500 hover:scale-105 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Let’s Create an Account!
        </h2>
          <p className="text-center text-gray-600 mb-6">
          Join us and start booking appointments in seconds.
        </p>


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

        
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password2"
    placeholder="Password"
    value={formData.password2}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? (
      <AiFillEye size={20} />
    ) : (
      <AiFillEyeInvisible size={20} />
    )}
  </button>
</div>


          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Confirm Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold 
                       transition-all duration-300 hover:bg-blue-600 hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <div id="googleSignUp" className="w-full flex justify-center"></div>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // <-- Step 1 Integrated
import { FiMail, FiLock } from "react-icons/fi";
import MainLayout from "../../layouts/MainLayout";
import { useCustomerAuth } from "../../context/CustomerAuthContext"; // <-- Step 1 Integrated
import toast from "react-hot-toast"; // <-- Step 1 Integrated

function Login() {
  const navigate = useNavigate(); // <-- Step 2 Integrated
  const location = useLocation(); // <-- Step 2 Integrated
  const { login } = useCustomerAuth(); // <-- Step 2 Integrated

  // Controlled form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect path logic if coming from a protected route page
  const from = location.state?.from?.pathname || "/"; // <-- Step 2 Integrated

  // 🔥 Step 3 & 4 Integrated: Form Submit Handler
  const handleLogin = (e) => {
    e.preventDefault();

    // Frontend testing dummy login flow using the actual dynamic input email
    const customer = {
      id: 1,
      name: "Ashish Raj",
      email: email || "ashish@example.com", // Dynamic email input value saved
    };

    login("dummy_customer_token", customer);
    toast.success("Login Successful");
    
    // Redirects user back to their intended protected page (like /cart) or home
    navigate(from, { replace: true });
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
          
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#111111]">
              Welcome Back
            </h1>
            <p className="mt-3 text-gray-500">
              Login to your MK Jewellers account
            </p>
          </div>

          {/* Form Setup */}
          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Email Address
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-[#C9A227] bg-white transition">
                <FiMail className="text-gray-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-4 outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 px-4 focus-within:border-[#C9A227] bg-white transition">
                <FiLock className="text-gray-400 shrink-0" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-4 outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm select-none text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-[#C9A227]" />
                Remember Me
              </label>
              <Link
                to="#"
                className="text-sm text-[#C9A227] hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Action Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-[#C9A227] shadow-md active:scale-[0.99]"
            >
              Login
            </button>

            {/* Divider Line */}
            <div className="relative my-6">
              <hr className="border-gray-200" />
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-medium tracking-wider text-gray-400">
                OR
              </span>
            </div>

            {/* Social Authentication Button */}
            <button
              type="button"
              className="w-full rounded-xl border border-gray-300 py-4 font-medium text-gray-700 transition hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              Continue with Google
            </button>
          </form>

          {/* Registration Redirect */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#C9A227] hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </section>
    </MainLayout>
  );
}

export default Login;
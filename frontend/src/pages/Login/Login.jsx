import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import MainLayout from "../../layouts/MainLayout";

function Login() {
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

          {/* Form */}

          <form className="mt-10 space-y-6">

            {/* Email */}

            <div>

              <label className="mb-2 block font-medium">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-4">

                <FiMail className="text-gray-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-4 outline-none"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block font-medium">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-4">

                <FiLock className="text-gray-500" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-4 outline-none"
                />

              </div>

            </div>

            {/* Remember */}

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm">

                <input type="checkbox" />

                Remember Me

              </label>

              <Link
                to="#"
                className="text-sm text-[#C9A227] hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login */}

            <button
              type="submit"
              className="w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-[#C9A227]"
            >
              Login
            </button>

            {/* Divider */}

            <div className="relative">

              <hr />

              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                OR
              </span>

            </div>

            {/* Google */}

            <button
              type="button"
              className="w-full rounded-xl border py-4 transition hover:bg-gray-100"
            >
              Continue with Google
            </button>

          </form>

          {/* Signup */}

          <p className="mt-8 text-center text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-[#C9A227]"
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
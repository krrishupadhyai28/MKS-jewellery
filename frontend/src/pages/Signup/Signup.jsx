import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import MainLayout from "../../layouts/MainLayout";

function Signup() {
  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

          {/* Heading */}
          <div className="text-center">

            <h1 className="text-4xl font-bold text-[#111111]">
              Create Account
            </h1>

            <p className="mt-3 text-gray-500">
              Join MK Jewellers today
            </p>

          </div>

          {/* Form */}
          <form className="mt-10 space-y-6">

            {/* Name */}
            <div>

              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-4">

                <FiUser className="text-gray-500" />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-3 py-4 outline-none"
                />

              </div>

            </div>

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
                  placeholder="Create password"
                  className="w-full px-3 py-4 outline-none"
                />

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="mb-2 block font-medium">
                Confirm Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 px-4">

                <FiLock className="text-gray-500" />

                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-3 py-4 outline-none"
                />

              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-[#C9A227]"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-[#C9A227]"
            >
              Login
            </Link>

          </p>

        </div>

      </section>
    </MainLayout>
  );
}

export default Signup;
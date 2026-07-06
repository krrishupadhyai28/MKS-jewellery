import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData);

    // TODO:
    // Reset Password API
    // Navigate("/admin/login")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F6F2] p-6">

      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">

        {/* Logo */}

        <div className="flex justify-center">

          <img
            src="/logo.png"
            alt="MK Jewellers"
            className="h-20"
          />

        </div>

        {/* Heading */}

        <div className="mt-6 text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Reset Password
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new secure password.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* New Password */}

          <div>

            <label className="mb-2 block font-medium">
              New Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-[#C9A227]"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-[#C9A227]"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#C9A227] py-3 font-semibold text-white transition hover:bg-[#B08D1F]"
          >
            Reset Password
          </button>

        </form>

        {/* Back */}

        <div className="mt-8 text-center">

          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 font-medium text-[#C9A227] hover:underline"
          >
            <FaArrowLeft />
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;
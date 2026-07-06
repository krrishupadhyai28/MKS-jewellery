import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
} from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    // TODO:
    // Forgot Password API
    // Send OTP
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
            Forgot Password
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your registered email to receive an OTP.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>

            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                placeholder="admin@mkjewellers.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-[#C9A227]"
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#C9A227] py-3 font-semibold text-white transition hover:bg-[#B08D1F]"
          >
            Send OTP
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

export default ForgotPassword;
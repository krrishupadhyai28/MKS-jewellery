import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";

function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredOTP = otp.join("");

    console.log(enteredOTP);

    // TODO:
    // Verify OTP API
    // Navigate("/admin/reset-password")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F6F2] p-6">

      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF8E6]">

            <FaShieldAlt
              size={35}
              className="text-[#C9A227]"
            />

          </div>

        </div>

        {/* Heading */}

        <div className="mt-6 text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            OTP Verification
          </h1>

          <p className="mt-2 text-gray-500">
            Enter the 6-digit verification code sent to your email.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          <div className="flex justify-center gap-3">

            {otp.map((digit, index) => (

              <input
                key={index}
                ref={(el) =>
                  (inputRefs.current[index] = el)
                }
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="h-14 w-14 rounded-xl border border-gray-300 text-center text-xl font-bold outline-none transition focus:border-[#C9A227]"
              />

            ))}

          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-[#C9A227] py-3 font-semibold text-white transition hover:bg-[#B08D1F]"
          >
            Verify OTP
          </button>

        </form>

        {/* Resend */}

        <div className="mt-6 text-center">

          <button className="font-medium text-[#C9A227] hover:underline">
            Resend OTP
          </button>

        </div>

        {/* Back */}

        <div className="mt-6 text-center">

          <Link
            to="/admin/forgot-password"
            className="inline-flex items-center gap-2 font-medium text-[#C9A227] hover:underline"
          >

            <FaArrowLeft />

            Back

          </Link>

        </div>

      </div>

    </div>
  );
}

export default OTPVerification;
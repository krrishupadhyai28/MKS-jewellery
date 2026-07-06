import { useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
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
      formData.newPassword !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    console.log(formData);

    // TODO:
    // Change Password API
  };

  const passwordInput = (
    label,
    name,
    value,
    show,
    setShow,
    placeholder
  ) => (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <div className="relative">

        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 outline-none focus:border-[#C9A227]"
          required
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>
    </div>
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Change Password
        </h1>

        <p className="mt-2 text-gray-500">
          Update your account password for better security.
        </p>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {passwordInput(
            "Current Password",
            "currentPassword",
            formData.currentPassword,
            showCurrent,
            setShowCurrent,
            "Enter current password"
          )}

          {passwordInput(
            "New Password",
            "newPassword",
            formData.newPassword,
            showNew,
            setShowNew,
            "Enter new password"
          )}

          {passwordInput(
            "Confirm New Password",
            "confirmPassword",
            formData.confirmPassword,
            showConfirm,
            setShowConfirm,
            "Confirm new password"
          )}

          <div className="flex justify-end">

            <button
              type="submit"
              className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
            >
              Update Password
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;
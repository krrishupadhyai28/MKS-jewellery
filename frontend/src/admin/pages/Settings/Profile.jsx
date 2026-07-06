import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
} from "react-icons/fa";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "Admin",
    email: "admin@mkjewellers.com",
    phone: "+91 9876543210",
    role: "Administrator",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // TODO:
    // Update Profile API
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your personal information.
        </p>

      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        {/* Avatar */}

        <div className="mb-10 flex flex-col items-center">

          <div className="relative">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#FFF8E6]">

              <FaUser
                size={45}
                className="text-[#C9A227]"
              />

            </div>

            <button
              className="absolute bottom-0 right-0 rounded-full bg-[#C9A227] p-3 text-white hover:bg-[#b08d1f]"
            >
              <FaCamera />
            </button>

          </div>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >

          {/* Name */}

          <div>

            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
              />

            </div>

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 block font-medium">
              Phone Number
            </label>

            <div className="relative">

              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-[#C9A227]"
              />

            </div>

          </div>

          {/* Role */}

          <div>

            <label className="mb-2 block font-medium">
              Role
            </label>

            <input
              type="text"
              value={formData.role}
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3"
            />

          </div>

          {/* Footer */}

          <div className="flex justify-end md:col-span-2">

            <button
              type="submit"
              className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Profile;
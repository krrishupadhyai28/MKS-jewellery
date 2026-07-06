import { useState } from "react";

function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: "Admin",
    email: "admin@mkjewellers.com",
    phone: "+91 9876543210",
    designation: "Store Administrator",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(profile);

    // Backend API
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-900">
          Profile Settings
        </h2>

        <p className="mt-2 text-gray-500">
          Update your administrator profile information.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >

        {/* Full Name */}

        <div>

          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block font-medium">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Designation */}

        <div>

          <label className="mb-2 block font-medium">
            Designation
          </label>

          <input
            type="text"
            name="designation"
            value={profile.designation}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          />

        </div>

        {/* Save */}

        <div className="md:col-span-2 flex justify-end">

          <button
            type="submit"
            className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Update Profile
          </button>

        </div>

      </form>

    </div>
  );
}

export default ProfileSettings;
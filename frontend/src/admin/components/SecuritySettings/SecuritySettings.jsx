import { useState } from "react";
import {
  FaLock,
  FaShieldAlt,
  FaSignOutAlt,
  FaMobileAlt,
} from "react-icons/fa";

function SecuritySettings() {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

    twoFactor: false,

    autoLogout: true,

    sessionTimeout: "30",

    loginAlerts: true,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setSecurity({
      ...security,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(security);

    // Backend API
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
          <FaShieldAlt className="text-[#C9A227]" />
          Security Settings
        </h2>

        <p className="mt-2 text-gray-500">
          Manage your account security and login preferences.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-10"
      >

        {/* Change Password */}

        <div>

          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">

            <FaLock />

            Change Password

          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={security.currentPassword}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={security.newPassword}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={security.confirmPassword}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
            />

          </div>

        </div>

        {/* Security Options */}

        <div>

          <h3 className="mb-5 text-lg font-semibold">
            Security Options
          </h3>

          <div className="space-y-4">

            <label className="flex items-center justify-between rounded-xl border p-4">

              <div>

                <h4 className="font-semibold">
                  Enable Two-Factor Authentication
                </h4>

                <p className="text-sm text-gray-500">
                  Protect your admin account with OTP verification.
                </p>

              </div>

              <input
                type="checkbox"
                name="twoFactor"
                checked={security.twoFactor}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <div>

                <h4 className="font-semibold">
                  Auto Logout
                </h4>

                <p className="text-sm text-gray-500">
                  Automatically logout after inactivity.
                </p>

              </div>

              <input
                type="checkbox"
                name="autoLogout"
                checked={security.autoLogout}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <div>

                <h4 className="font-semibold">
                  Login Alerts
                </h4>

                <p className="text-sm text-gray-500">
                  Receive notifications whenever someone logs in.
                </p>

              </div>

              <input
                type="checkbox"
                name="loginAlerts"
                checked={security.loginAlerts}
                onChange={handleChange}
              />

            </label>

          </div>

        </div>

        {/* Session Timeout */}

        <div>

          <label className="mb-3 flex items-center gap-2 font-semibold">

            <FaSignOutAlt />

            Session Timeout (Minutes)

          </label>

          <select
            name="sessionTimeout"
            value={security.sessionTimeout}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A227]"
          >
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="120">2 Hours</option>
          </select>

        </div>

        {/* Trusted Devices */}

        <div>

          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold">

            <FaMobileAlt />

            Trusted Devices

          </h3>

          <div className="rounded-xl border p-5">

            <div className="flex items-center justify-between">

              <div>

                <h4 className="font-semibold">
                  Windows PC
                </h4>

                <p className="text-sm text-gray-500">
                  Chrome • Last Login: Today, 10:45 AM
                </p>

              </div>

              <button
                type="button"
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
              >
                Remove
              </button>

            </div>

          </div>

        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Save Security Settings
          </button>

        </div>

      </form>

    </div>
  );
}

export default SecuritySettings;
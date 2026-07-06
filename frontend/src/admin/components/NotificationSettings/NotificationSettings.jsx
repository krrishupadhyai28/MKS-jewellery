import { useState } from "react";

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailOrders: true,
    emailCustomers: true,
    emailLowStock: true,
    emailPromotions: false,

    smsOrders: true,
    smsCustomers: false,

    pushOrders: true,
    pushLowStock: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;

    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(settings);

    // Backend API
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-gray-900">
          Notification Settings
        </h2>

        <p className="mt-2 text-gray-500">
          Manage email, SMS and push notifications for your store.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-10"
      >

        {/* Email Notifications */}

        <div>

          <h3 className="mb-5 text-lg font-semibold">
            Email Notifications
          </h3>

          <div className="space-y-4">

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>New Order Emails</span>

              <input
                type="checkbox"
                name="emailOrders"
                checked={settings.emailOrders}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>New Customer Registration</span>

              <input
                type="checkbox"
                name="emailCustomers"
                checked={settings.emailCustomers}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Low Stock Alerts</span>

              <input
                type="checkbox"
                name="emailLowStock"
                checked={settings.emailLowStock}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Marketing Promotions</span>

              <input
                type="checkbox"
                name="emailPromotions"
                checked={settings.emailPromotions}
                onChange={handleChange}
              />

            </label>

          </div>

        </div>

        {/* SMS Notifications */}

        <div>

          <h3 className="mb-5 text-lg font-semibold">
            SMS Notifications
          </h3>

          <div className="space-y-4">

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Order SMS</span>

              <input
                type="checkbox"
                name="smsOrders"
                checked={settings.smsOrders}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Customer Registration SMS</span>

              <input
                type="checkbox"
                name="smsCustomers"
                checked={settings.smsCustomers}
                onChange={handleChange}
              />

            </label>

          </div>

        </div>

        {/* Push Notifications */}

        <div>

          <h3 className="mb-5 text-lg font-semibold">
            Push Notifications
          </h3>

          <div className="space-y-4">

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Order Updates</span>

              <input
                type="checkbox"
                name="pushOrders"
                checked={settings.pushOrders}
                onChange={handleChange}
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border p-4">

              <span>Low Stock Alerts</span>

              <input
                type="checkbox"
                name="pushLowStock"
                checked={settings.pushLowStock}
                onChange={handleChange}
              />

            </label>

          </div>

        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="rounded-xl bg-[#C9A227] px-8 py-3 font-semibold text-white transition hover:bg-[#b08d1f]"
          >
            Save Notification Settings
          </button>

        </div>

      </form>

    </div>
  );
}

export default NotificationSettings;
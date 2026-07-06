import StoreSettings from "../../components/StoreSettings/StoreSettings";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";
import PaymentSettings from "../../components/PaymentSettings/PaymentSettings";
import ShippingSettings from "../../components/ShippingSettings/ShippingSettings";
import NotificationSettings from "../../components/NotificationSettings/NotificationSettings";
import SecuritySettings from "../../components/SecuritySettings/SecuritySettings";

function Settings() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your store configuration, payment methods, shipping, notifications and security.
        </p>

      </div>

      {/* Store */}

      <StoreSettings />

      {/* Profile */}

      <ProfileSettings />

      {/* Payment */}

      <PaymentSettings />

      {/* Shipping */}

      <ShippingSettings />

      {/* Notifications */}

      <NotificationSettings />

      {/* Security */}

      <SecuritySettings />

    </div>
  );
}

export default Settings;
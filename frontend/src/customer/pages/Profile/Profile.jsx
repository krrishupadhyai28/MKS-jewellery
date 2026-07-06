import { Link, useNavigate } from "react-router-dom"; // <-- Step 1 (Integrated)
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useCustomerAuth } from "../../context/CustomerAuthContext"; // <-- Step 1 (Integrated)
import toast from "react-hot-toast"; // <-- Step 1 (Integrated)

function Profile() {
  const navigate = useNavigate(); // <-- Step 2 (Integrated)
  const { logout, user } = useCustomerAuth(); // <-- Step 2 (Integrated) (Added 'user' object if available)

  // Form states handling (Aap isme dynamic context values inject kar sakte hain)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
    address: user?.address || "",
  });

  // 🔥 Step 3: Integrated Logout Function
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Profile save karne ki API logic yahan aayegi
    toast.success("Profile updated successfully!");
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold">My Account</h1>
          <p className="mt-3 text-gray-500">
            Manage your profile and account settings.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="rounded-3xl bg-white p-6 shadow h-fit">
              <Link
                to="/profile"
                className="block w-full rounded-xl bg-black py-3 text-center text-white font-medium"
              >
                Profile
              </Link>

              <Link
                to="/orders"
                className="mt-4 block w-full rounded-xl border py-3 text-center font-medium transition hover:bg-[#C9A227] hover:text-white"
              >
                My Orders
              </Link>

              <Link
                to="/saved-address"
                className="mt-4 block w-full rounded-xl border py-3 text-center font-medium transition hover:bg-[#C9A227] hover:text-white"
              >
                Saved Address
              </Link>

              {/* 🔥 Step 4: Replaced with the integrated onClick Handler */}
              <button
                onClick={handleLogout}
                className="mt-4 w-full rounded-xl border border-red-500 py-3 text-red-500 font-medium transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-3 rounded-3xl bg-white p-8 shadow">
              <h2 className="text-3xl font-bold">Personal Information</h2>

              <form onSubmit={handleSaveChanges}>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                    disabled // Email usually changes nahi karne dete direct authentication setups me
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                  />

                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                  />
                </div>

                <textarea
                  rows="5"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <button
                  type="submit"
                  className="mt-8 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#C9A227]"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default Profile;
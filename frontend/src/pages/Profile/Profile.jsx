import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

function Profile() {
  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            My Account
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your profile and account settings.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-4">

            {/* Sidebar */}
            <div className="rounded-3xl bg-white p-6 shadow">

              <Link
                to="/profile"
                className="block w-full rounded-xl bg-black py-3 text-center text-white"
              >
                Profile
              </Link>

              <Link
                to="/orders"
                className="mt-4 block w-full rounded-xl border py-3 text-center transition hover:bg-[#C9A227] hover:text-white"
              >
                My Orders
              </Link>

              <Link
                to="/saved-address"
                className="mt-4 block w-full rounded-xl border py-3 text-center transition hover:bg-[#C9A227] hover:text-white"
              >
                Saved Address
              </Link>

              <button
                className="mt-4 w-full rounded-xl border border-red-500 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>

            </div>

            {/* Profile Content */}
            <div className="lg:col-span-3 rounded-3xl bg-white p-8 shadow">

              <h2 className="text-3xl font-bold">
                Personal Information
              </h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <input
                  type="text"
                  placeholder="City"
                  className="rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

              </div>

              <textarea
                rows="5"
                placeholder="Address"
                className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
              />

              <button
                className="mt-8 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#C9A227]"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      </section>
    </MainLayout>
  );
}

export default Profile;
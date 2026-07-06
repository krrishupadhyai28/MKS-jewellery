import MainLayout from "../../layouts/MainLayout";

function SavedAddress() {
  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Saved Addresses
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your delivery addresses.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">

            {/* Address Card */}

            <div className="rounded-3xl bg-white p-8 shadow">

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold">
                  Home
                </h2>

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  Default
                </span>

              </div>

              <p className="mt-6 text-gray-600 leading-8">
                Ashish Raj
                <br />
                House No. 123
                <br />
                Sitamarhi, Bihar
                <br />
                India - 843302
                <br />
                Phone: +91 9876543210
              </p>

              <div className="mt-8 flex gap-4">

                <button className="rounded-xl border border-[#C9A227] px-6 py-3 transition hover:bg-[#C9A227] hover:text-white">
                  Edit
                </button>

                <button className="rounded-xl border border-red-500 px-6 py-3 text-red-500 transition hover:bg-red-500 hover:text-white">
                  Delete
                </button>

              </div>

            </div>

            {/* Add Address */}

            <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Add New Address
              </h2>

              <div className="mt-8 space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <textarea
                  rows="4"
                  placeholder="Complete Address"
                  className="w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <button className="w-full rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-[#C9A227]">
                  Save Address
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>
    </MainLayout>
  );
}

export default SavedAddress;
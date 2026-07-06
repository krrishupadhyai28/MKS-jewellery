import MainLayout from "../../layouts/MainLayout";

function MyOrders() {
  const orders = [
    {
      id: "MK1001",
      date: "28 June 2026",
      status: "Delivered",
      total: 1799,
    },
    {
      id: "MK1002",
      date: "25 June 2026",
      status: "Processing",
      total: 999,
    },
    {
      id: "MK1003",
      date: "20 June 2026",
      status: "Cancelled",
      total: 1499,
    },
  ];

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            My Orders
          </h1>

          <p className="mt-3 text-gray-500">
            Track all your jewellery orders.
          </p>

          <div className="mt-12 space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-white p-8 shadow"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Order #{order.id}
                    </h2>

                    <p className="mt-2 text-gray-500">
                      {order.date}
                    </p>

                  </div>

                  <div>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="text-right">

                    <p className="text-xl font-bold">
                      ₹{order.total}
                    </p>

                    <button className="mt-3 rounded-xl border border-[#C9A227] px-6 py-2 transition hover:bg-[#C9A227] hover:text-white">
                      View Details
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>
    </MainLayout>
  );
}

export default MyOrders;
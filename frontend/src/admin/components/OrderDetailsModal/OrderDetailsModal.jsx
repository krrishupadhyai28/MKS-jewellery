import { FaTimes, FaPrint, FaFileInvoice } from "react-icons/fa";

function OrderDetailsModal({
  open,
  onClose,
  order,
}) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-5">

          <div>
            <h2 className="text-2xl font-bold">
              Order Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Order ID : {order.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="grid gap-8 p-8 lg:grid-cols-2">

          {/* Customer */}
          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-xl font-semibold">
              Customer Details
            </h3>

            <div className="space-y-3">

              <p>
                <span className="font-semibold">
                  Name :
                </span>{" "}
                {order.customer}
              </p>

              <p>
                <span className="font-semibold">
                  Email :
                </span>{" "}
                {order.email}
              </p>

              <p>
                <span className="font-semibold">
                  Phone :
                </span>{" "}
                {order.phone}
              </p>

            </div>

          </div>

          {/* Shipping */}
          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-xl font-semibold">
              Shipping Address
            </h3>

            <p className="leading-8 text-gray-600">
              221 MG Road
              <br />
              Indore
              <br />
              Madhya Pradesh
              <br />
              India - 452001
            </p>

          </div>

          {/* Product */}
          <div className="rounded-2xl border p-6 lg:col-span-2">

            <h3 className="mb-6 text-xl font-semibold">
              Ordered Product
            </h3>

            <div className="flex items-center gap-6">

              <img
                src={order.image}
                alt={order.product}
                className="h-28 w-28 rounded-xl object-cover"
              />

              <div>

                <h4 className="text-2xl font-semibold">
                  {order.product}
                </h4>

                <p className="mt-2 text-gray-500">
                  Quantity : 1
                </p>

                <p className="mt-2 font-semibold text-[#C9A227]">
                  ₹{order.amount.toLocaleString("en-IN")}
                </p>

              </div>

            </div>

          </div>

          {/* Payment */}
          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-xl font-semibold">
              Payment
            </h3>

            <div className="space-y-3">

              <p>
                <span className="font-semibold">
                  Method :
                </span>{" "}
                UPI
              </p>

              <p>
                <span className="font-semibold">
                  Status :
                </span>{" "}
                {order.payment}
              </p>

              <p>
                <span className="font-semibold">
                  Amount :
                </span>{" "}
                ₹{order.amount.toLocaleString("en-IN")}
              </p>

            </div>

          </div>

          {/* Order Status */}
          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-xl font-semibold">
              Order Status
            </h3>

            <div className="space-y-3">

              <p>
                <span className="font-semibold">
                  Current Status :
                </span>{" "}
                {order.status}
              </p>

              <p>
                <span className="font-semibold">
                  Order Date :
                </span>{" "}
                {order.date}
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-end gap-4 border-t px-8 py-5">

          <button className="flex items-center gap-2 rounded-xl border px-5 py-3 font-medium hover:bg-gray-100">
            <FaPrint />
            Print
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white transition hover:bg-[#b08d1f]">
            <FaFileInvoice />
            Generate Invoice
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderDetailsModal;
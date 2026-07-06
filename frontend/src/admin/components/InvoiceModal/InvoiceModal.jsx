import { FaTimes, FaPrint, FaDownload } from "react-icons/fa";

function InvoiceModal({
  open,
  onClose,
  order,
}) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-[#C9A227]">
              MK JEWELLERS
            </h2>

            <p className="text-sm text-gray-500">
              Premium Jewellery Collection
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Invoice */}

        <div className="space-y-8 p-8">

          {/* Invoice Info */}

          <div className="grid gap-8 md:grid-cols-2">

            <div>

              <h3 className="mb-3 text-xl font-semibold">
                Bill To
              </h3>

              <p className="font-semibold">
                {order.customer}
              </p>

              <p>{order.email}</p>

              <p>{order.phone}</p>

            </div>

            <div className="text-right">

              <h3 className="mb-3 text-xl font-semibold">
                Invoice
              </h3>

              <p>
                <span className="font-semibold">
                  Invoice :
                </span>{" "}
                INV-{order.id}
              </p>

              <p>
                <span className="font-semibold">
                  Date :
                </span>{" "}
                {order.date}
              </p>

              <p>
                <span className="font-semibold">
                  Payment :
                </span>{" "}
                {order.payment}
              </p>

            </div>

          </div>

          {/* Table */}

          <div className="overflow-hidden rounded-xl border">

            <table className="min-w-full">

              <thead className="bg-[#F8F6F2]">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Product
                  </th>

                  <th className="px-5 py-4 text-center">
                    Qty
                  </th>

                  <th className="px-5 py-4 text-right">
                    Price
                  </th>

                  <th className="px-5 py-4 text-right">
                    Total
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={order.image}
                        alt={order.product}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <span className="font-medium">
                        {order.product}
                      </span>

                    </div>

                  </td>

                  <td className="text-center">
                    1
                  </td>

                  <td className="text-right">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="pr-5 text-right font-semibold">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* Summary */}

          <div className="ml-auto w-full max-w-sm space-y-3">

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span>
                ₹{order.amount.toLocaleString("en-IN")}
              </span>

            </div>

            <div className="flex justify-between">

              <span>GST (3%)</span>

              <span>
                ₹{Math.round(order.amount * 0.03).toLocaleString("en-IN")}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Shipping</span>

              <span>Free</span>

            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold text-[#C9A227]">

              <span>Total</span>

              <span>
                ₹{Math.round(order.amount * 1.03).toLocaleString("en-IN")}
              </span>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t px-8 py-5">

          <button className="flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-gray-100">

            <FaPrint />

            Print

          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#C9A227] px-6 py-3 font-semibold text-white hover:bg-[#b08d1f]">

            <FaDownload />

            Download PDF

          </button>

        </div>

      </div>

    </div>
  );
}

export default InvoiceModal;
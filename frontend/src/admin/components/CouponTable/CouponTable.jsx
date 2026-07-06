import CouponRow from "../CouponRow/CouponRow";
import { couponsData } from "../../data/couponsData";

function CouponTable({
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-[#F8F6F2]">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Coupon Code
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Type
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Discount
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Minimum Order
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Usage
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Expiry Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {couponsData.map((coupon) => (

              <CouponRow
                key={coupon.id}
                coupon={coupon}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CouponTable;
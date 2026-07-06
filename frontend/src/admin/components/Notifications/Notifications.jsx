import { notifications } from "../../data/notificationsData";

function Notifications() {
  const getColor = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600";

      case "green":
        return "bg-green-100 text-green-600";

      case "yellow":
        return "bg-yellow-100 text-yellow-600";

      case "purple":
        return "bg-purple-100 text-purple-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-gray-900">
          Notifications
        </h2>

        <button className="text-sm font-medium text-[#C9A227] hover:underline">
          View All
        </button>

      </div>

      {/* List */}

      <div className="space-y-4">

        {notifications.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${getColor(
                  item.color
                )}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.message}
                </p>

              </div>

              <span className="text-xs text-gray-400">
                {item.time}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Notifications;
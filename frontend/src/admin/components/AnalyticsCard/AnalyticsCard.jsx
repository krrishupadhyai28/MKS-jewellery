function AnalyticsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}) {
  const colors = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
  };

  const currentColor = colors[color] || colors.green;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            {value}
          </h2>

          <p className="mt-3 text-sm font-semibold text-green-600">
            {change} this month
          </p>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${currentColor.bg}`}
        >
          <Icon
            className={currentColor.text}
            size={28}
          />
        </div>

      </div>

    </div>
  );
}

export default AnalyticsCard;
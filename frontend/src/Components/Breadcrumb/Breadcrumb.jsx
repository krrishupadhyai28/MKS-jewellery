import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  return (
    <div className="mb-8 text-sm text-gray-500">
      <Link
        to="/"
        className="hover:text-[#C9A227]"
      >
        Home
      </Link>

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;

        const to =
          "/" +
          pathnames
            .slice(0, index + 1)
            .join("/");

        return (
          <span key={to}>
            {" "}
            /{" "}
            {last ? (
              <span className="font-semibold text-black capitalize">
                {value.replace("-", " ")}
              </span>
            ) : (
              <Link
                to={to}
                className="capitalize hover:text-[#C9A227]"
              >
                {value.replace("-", " ")}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
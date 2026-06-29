import MainLayout from "../../layouts/MainLayout";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#FAF7F2] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-[#111111]">
            My Wishlist
          </h1>

          <p className="mt-3 text-gray-600">
            Save your favourite jewellery items.
          </p>

          {wishlist.length === 0 ? (
            <div className="mt-16 text-center">

              <h2 className="text-3xl font-semibold">
                Your Wishlist is Empty ❤️
              </h2>

              <p className="mt-4 text-gray-500">
                Add your favourite jewellery to see them here.
              </p>

            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-xl font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-2xl font-bold">
                      ₹{product.price}
                    </p>

                    <div className="mt-6 space-y-3">

                      <button className="w-full rounded-xl bg-black py-3 text-white transition hover:bg-[#C9A227]">
                        Add To Cart
                      </button>

                      <button
                        onClick={() => {
                          removeFromWishlist(product.id);
                          toast.success("Removed from Wishlist");
                        }}
                        className="w-full rounded-xl border border-red-500 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </section>
    </MainLayout>
  );
}

export default Wishlist;
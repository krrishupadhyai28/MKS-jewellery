import { useState } from "react";
import reviews from "../../data/reviews";

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const [reviewList, setReviewList] = useState(
    reviews.filter(
      (review) => review.productId === product.id
    )
  );

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 border-b">

          <button
            onClick={() => setActiveTab("description")}
            className={`border-b-2 px-6 py-4 font-semibold transition ${
              activeTab === "description"
                ? "border-[#C9A227] text-[#C9A227]"
                : "border-transparent text-gray-500"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`border-b-2 px-6 py-4 font-semibold transition ${
              activeTab === "reviews"
                ? "border-[#C9A227] text-[#C9A227]"
                : "border-transparent text-gray-500"
            }`}
          >
            Reviews
          </button>

          <button
            onClick={() => setActiveTab("shipping")}
            className={`border-b-2 px-6 py-4 font-semibold transition ${
              activeTab === "shipping"
                ? "border-[#C9A227] text-[#C9A227]"
                : "border-transparent text-gray-500"
            }`}
          >
            Shipping
          </button>

        </div>

        {/* Content */}
        <div className="mt-10">

          {/* Description */}
          {activeTab === "description" && (
            <div>

              <h3 className="text-2xl font-bold">
                Product Description
              </h3>

              <p className="mt-5 leading-8 text-gray-600">
                {product.description}
              </p>

            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div>

              <h3 className="text-2xl font-bold">
                Customer Reviews
              </h3>

              {reviewList.length === 0 ? (

                <p className="mt-6 text-gray-500">
                  No reviews yet.
                </p>

              ) : (

                <div className="mt-8 space-y-6">

                  {reviewList.map((review) => (

                    <div
                      key={review.id}
                      className="rounded-2xl border p-6 shadow-sm"
                    >

                      <div className="flex items-center justify-between">

                        <h4 className="font-semibold">
                          {review.name}
                        </h4>

                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>

                      </div>

                      <div className="mt-2 text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </div>

                      <p className="mt-4 leading-7 text-gray-600">
                        {review.comment}
                      </p>

                    </div>

                  ))}

                </div>

              )}

              {/* Write Review */}

              <div className="mt-12 rounded-3xl border p-6">

                <h3 className="text-2xl font-bold">
                  Write a Review
                </h3>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="mt-6 w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <select
                  value={rating}
                  onChange={(e) =>
                    setRating(Number(e.target.value))
                  }
                  className="mt-4 w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐</option>
                  <option value={4}>⭐⭐⭐⭐</option>
                  <option value={3}>⭐⭐⭐</option>
                  <option value={2}>⭐⭐</option>
                  <option value={1}>⭐</option>
                </select>

                <textarea
                  rows="5"
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  className="mt-4 w-full rounded-xl border p-4 outline-none focus:border-[#C9A227]"
                />

                <button
                  onClick={() => {
                    if (!name || !comment) return;

                    const newReview = {
                      id: Date.now(),
                      productId: product.id,
                      name,
                      comment,
                      rating,
                      date: new Date().toLocaleDateString(),
                    };

                    setReviewList([
                      newReview,
                      ...reviewList,
                    ]);

                    setName("");
                    setComment("");
                    setRating(5);
                  }}
                  className="mt-6 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-[#C9A227]"
                >
                  Submit Review
                </button>

              </div>

            </div>
          )}

          {/* Shipping */}

          {activeTab === "shipping" && (
            <div>

              <h3 className="text-2xl font-bold">
                Shipping & Returns
              </h3>

              <ul className="mt-6 list-disc space-y-3 pl-6 text-gray-600">

                <li>
                  Free shipping across India.
                </li>

                <li>
                  Delivery within 3–7 business days.
                </li>

                <li>
                  Easy 7-day return policy.
                </li>

                <li>
                  100% Secure Payment.
                </li>

              </ul>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default ProductTabs;
"use client";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      author: "John Smith",
      rating: 5,
      date: "2025-01-25",
      text: "Excellent gift service! Very satisfied with the quality and presentation.",
      product: "Premium Gift Card",
      status: "Published",
    },
    {
      id: 2,
      author: "Sarah Johnson",
      rating: 4,
      date: "2025-01-23",
      text: "Good service, quick delivery. Would appreciate more options.",
      product: "Gift Card Pack",
      status: "Published",
    },
    {
      id: 3,
      author: "Mike Brown",
      rating: 5,
      date: "2025-01-20",
      text: "Amazing experience! Highly recommended for gift shopping.",
      product: "Luxury Gift Set",
      status: "Published",
    },
    {
      id: 4,
      author: "Emma Wilson",
      rating: 3,
      date: "2025-01-18",
      text: "Average service, but the gift was nice. Shipping took longer than expected.",
      product: "Birthday Special",
      status: "Pending",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Customer Reviews
      </h1>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {review.author}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For: {review.product}
                </p>
              </div>
              <div className="text-right">
                {renderStars(review.rating)}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {review.date}
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{review.text}</p>

            <div className="flex justify-between items-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  review.status === "Published"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {review.status}
              </span>
              <div className="flex gap-3">
                {review.status === "Pending" && (
                  <>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition">
                      Approve
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-semibold transition">
                      Reject
                    </button>
                  </>
                )}
                <button className="text-red-600 hover:text-red-700 font-semibold transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Total Reviews
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {reviews.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Average Rating
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {(
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)}
            ★
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Published
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {reviews.filter((r) => r.status === "Published").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Pending
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {reviews.filter((r) => r.status === "Pending").length}
          </p>
        </div>
      </div>
    </div>
  );
}

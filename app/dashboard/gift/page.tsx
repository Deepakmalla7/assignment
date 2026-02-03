"use client";

export default function GiftPage() {
  const gifts = [
    {
      id: 1,
      name: "Birthday Special Gift",
      recipient: "Sarah Johnson",
      amount: "$50.00",
      date: "2025-01-25",
      status: "Sent",
      message: "Happy Birthday! Enjoy this special gift!",
    },
    {
      id: 2,
      name: "Anniversary Gift",
      recipient: "Mike Brown",
      amount: "$100.00",
      date: "2025-01-20",
      status: "Delivered",
      message: "Celebrating our special day with you!",
    },
    {
      id: 3,
      name: "Holiday Gift Pack",
      recipient: "Emma Wilson",
      amount: "$75.00",
      date: "2025-01-15",
      status: "Pending",
      message: "Hope you have a wonderful holiday season!",
    },
    {
      id: 4,
      name: "Thank You Gift",
      recipient: "John Smith",
      amount: "$40.00",
      date: "2025-01-10",
      status: "Delivered",
      message: "Thank you for everything you do!",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Send Gifts
        </h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition">
          + Send New Gift
        </button>
      </div>

      {/* Gifts List */}
      <div className="space-y-4">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {gift.name}
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="font-semibold">To:</span> {gift.recipient}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> {gift.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {gift.date}
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Message:
                  </p>
                  <p className="italic text-gray-700 dark:text-gray-300">
                    "{gift.message}"
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      gift.status
                    )}`}
                  >
                    {gift.status}
                  </span>
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold transition">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-semibold transition">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Total Gifts Sent
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {gifts.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Delivered
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {gifts.filter((g) => g.status === "Delivered").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Total Amount Gifted
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            $265.00
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Pending
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {gifts.filter((g) => g.status === "Pending").length}
          </p>
        </div>
      </div>
    </div>
  );
}

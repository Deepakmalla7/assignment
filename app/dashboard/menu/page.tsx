"use client";

export default function MenuPage() {
  const menuItems = [
    {
      id: 1,
      name: "Premium Gift Card",
      category: "Digital Gifts",
      price: "$50.00",
      status: "Active",
      orders: 128,
    },
    {
      id: 2,
      name: "Gift Card Pack",
      category: "Bundles",
      price: "$150.00",
      status: "Active",
      orders: 95,
    },
    {
      id: 3,
      name: "Luxury Gift Set",
      category: "Physical Gifts",
      price: "$200.00",
      status: "Active",
      orders: 42,
    },
    {
      id: 4,
      name: "Birthday Special",
      category: "Seasonal",
      price: "$75.00",
      status: "Inactive",
      orders: 18,
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Menu
        </h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition">
          + Add New Item
        </button>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {item.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {item.orders}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold transition">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 font-semibold transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Total Items
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {menuItems.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Active Items
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {menuItems.filter((i) => i.status === "Active").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {menuItems.reduce((sum, item) => sum + item.orders, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            $12.5K
          </p>
        </div>
      </div>
    </div>
  );
}

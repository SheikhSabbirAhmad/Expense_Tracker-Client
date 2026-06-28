"use client";

import { Expense } from "@/app/page";

type Props = {
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  onEdit: (expense: Expense) => void;
};

export default function ExpenseList({
  expenses,
  fetchExpenses,
  onEdit,
}: Props) {
  // ==========================
  // Delete Expense
  // ==========================

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://expense-tracker-server-eight-black.vercel.app/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Expense Deleted Successfully!");
        await fetchExpenses();
      }
    } catch (error) {
      console.log(error);
      alert("Delete Failed!");
    }
  };

  // ==========================
  // Badge Color
  // ==========================

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Food":
        return "bg-green-100 text-green-700";

      case "Transport":
        return "bg-blue-100 text-blue-700";

      case "Shopping":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================
  // Total Amount
  // ==========================

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Expense List
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage all your recorded expenses.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-xl text-sm w-fit">
            Total: {expenses.length} Expense
            {expenses.length !== 1 && "s"}
          </div>

          <div className="bg-green-50 text-green-700 font-semibold px-4 py-2 rounded-xl text-sm w-fit">
            Total Amount: ৳ {totalAmount}
          </div>
        </div>
      </div>

      {/* Empty State */}

      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">📂</div>

          <h3 className="text-2xl font-semibold text-gray-700">
            No Expense Found
          </h3>

          <p className="text-gray-500 mt-2 text-center">
            Add your first expense to see it here.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Title
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((expense, index) => (
                  <tr
                    key={expense._id}
                    className={`transition hover:bg-gray-50 ${
                      index !== expenses.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    {/* Title */}

                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">
                        {expense.title}
                      </p>
                    </td>

                    {/* Amount */}

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-green-600">
                        ৳ {expense.amount}
                      </span>
                    </td>

                    {/* Category */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getBadgeColor(
                          expense.category
                        )}`}
                      >
                        {expense.category}
                      </span>
                    </td>

                    {/* Date */}

                    <td className="px-5 py-4 whitespace-nowrap text-gray-600">
                      {expense.date}
                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">
                      <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <button
                          onClick={() => onEdit(expense)}
                          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(expense._id!)}
                          className="rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}

          <div className="mt-6 flex justify-end">
            <div className="bg-gray-100 rounded-xl shadow-md p-6 w-full sm:w-80">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-600 font-medium">
                  Total Expenses
                </span>

                <span className="text-xl font-bold text-blue-700">
                  {expenses.length}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-gray-600 font-medium">
                  Total Amount
                </span>

                <span className="text-2xl font-bold text-green-600">
                  ৳ {totalAmount}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
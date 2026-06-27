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
        `http://localhost:5000/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Expense Deleted Successfully!");

        fetchExpenses();
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

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="text-3xl font-bold mb-6">
        Expense List
      </h2>

      {expenses.length === 0 ? (
        <div className="text-center py-16">

          <h3 className="text-xl font-semibold text-gray-500">
            No Expense Found
          </h3>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full border border-gray-200">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Title
                </th>

                <th className="px-4 py-3 text-left">
                  Amount
                </th>

                <th className="px-4 py-3 text-left">
                  Category
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4">
                    {expense.title}
                  </td>

                  <td className="px-4 py-4 font-medium">
                    ৳ {expense.amount}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                        expense.category
                      )}`}
                    >
                      {expense.category}
                    </span>

                  </td>

                  <td className="px-4 py-4">
                    {expense.date}
                  </td>

                  <td className="px-4 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => onEdit(expense)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(expense._id!)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
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
      )}
    </div>
  );
}
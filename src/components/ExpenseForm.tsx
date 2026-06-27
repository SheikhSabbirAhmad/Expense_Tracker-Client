"use client";

import { useEffect, useState } from "react";
import { Expense } from "@/app/page";

type Props = {
  editingExpense: Expense | null;
  fetchExpenses: () => Promise<void>;
  clearEditing: () => void;
};

export default function ExpenseForm({
  editingExpense,
  fetchExpenses,
  clearEditing,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        date: editingExpense.date,
      });
    }
  }, [editingExpense]);

  // Input Change


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const expense = {
      ...formData,
      amount: Number(formData.amount),
    };

    try {
      let response;

      // UPDATE

      if (editingExpense?._id) {
        response = await fetch(
          `http://localhost:5000/expenses/${editingExpense._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(expense),
          }
        );
      }

      // ADD

      else {
        response = await fetch(
          "http://localhost:5000/expenses",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(expense),
          }
        );
      }

      const data = await response.json();

      if (data.success) {
        alert(
          editingExpense
            ? "Expense Updated Successfully!"
            : "Expense Added Successfully!"
        );

        // Reset Form

        setFormData({
          title: "",
          amount: "",
          category: "",
          date: "",
        });

        // Edit Mode Off

        clearEditing();

        // Refresh Table

        fetchExpenses();
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

 return (
  <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-6 md:p-8 mb-10">

    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        {editingExpense ? "Update Expense" : "Add New Expense"}
      </h2>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        {editingExpense
          ? "Update your existing expense information."
          : "Fill in the details below to add a new expense."}
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Title */}

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Expense Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter expense title"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Amount + Category */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select Category</option>
            <option value="Food">🍔 Food</option>
            <option value="Transport">🚗 Transport</option>
            <option value="Shopping">🛍 Shopping</option>
            <option value="Others">📦 Others</option>
          </select>
        </div>

      </div>

      {/* Date */}

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Expense Date
        </label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Buttons */}

      <div className="flex flex-col sm:flex-row gap-4 pt-2">

        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-md"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>

        {editingExpense && (
          <button
            type="button"
            onClick={() => {
              clearEditing();

              setFormData({
                title: "",
                amount: "",
                category: "",
                date: "",
              });
            }}
            className="flex-1 sm:flex-none px-8 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  </div>
);
}
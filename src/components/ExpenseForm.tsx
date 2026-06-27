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

  // ==========================
  // Edit করলে Form Auto Fill
  // ==========================

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

  // ==========================
  // Input Change
  // ==========================

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

  // ==========================
  // Submit
  // ==========================

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

      // ======================
      // UPDATE
      // ======================

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

      // ======================
      // ADD
      // ======================

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
    <div className="bg-white shadow rounded-xl p-6 mb-10">

      <h2 className="text-3xl font-bold mb-6">

        {editingExpense
          ? "Update Expense"
          : "Add New Expense"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Title */}

        <div>

          <label className="block mb-2 font-medium">
            Expense Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Expense title"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Amount */}

        <div>

          <label className="block mb-2 font-medium">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Category */}

        <div>

          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">
              Select Category
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Others">
              Others
            </option>

          </select>

        </div>

        {/* Date */}

        <div>

          <label className="block mb-2 font-medium">
            Expense Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        {/* Buttons */}

        <div className="flex gap-4">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {editingExpense
              ? "Update Expense"
              : "Add Expense"}
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
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseChart from "@/components/ExpenseChart";

export type Expense = {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] =
    useState<Expense | null>(null);

  // ==========================
  // Fetch Expenses
  // ==========================

  const fetchExpenses = async () => {
    try {
      const res = await fetch("https://expense-tracker-server-eight-black.vercel.app/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ==========================
  // Calculate Total Amount
  // ==========================

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <>
      {/* Header */}
      <Header
        totalExpenses={expenses.length}
        totalAmount={totalAmount}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-10 space-y-8">
        {/* Expense Form */}
        <ExpenseForm
          editingExpense={editingExpense}
          fetchExpenses={fetchExpenses}
          clearEditing={() => setEditingExpense(null)}
        />

        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          fetchExpenses={fetchExpenses}
          onEdit={(expense) =>
            setEditingExpense(expense)
          }
        />

        {/* Expense Pie Chart */}
        <ExpenseChart expenses={expenses} />
      </main>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";

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

  const fetchExpenses = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/expenses"
      );

      const data = await res.json();

      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-10">

      <ExpenseForm
        editingExpense={editingExpense}
        fetchExpenses={fetchExpenses}
        clearEditing={() =>
          setEditingExpense(null)
        }
      />

      <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        onEdit={(expense) =>
          setEditingExpense(expense)
        }
      />

    </main>
  );
}
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExpenseForm from "@/components/ExpenseForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <section className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <ExpenseForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
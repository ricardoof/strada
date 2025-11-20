import { Outlet } from "react-router-dom";
import { Header } from "../components/header"; // Importe seu Header
import { Footer } from "../components/footer";

export function MainLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-font">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
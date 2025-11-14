import { Outlet } from "react-router-dom";
import { Header } from "../components/header"; // Importe seu Header
import { Footer } from "../components/footer";

export function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-background text-font">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
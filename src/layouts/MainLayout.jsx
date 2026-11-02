import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <Outlet />

      <Footer />

    </div>
  );
};

export default MainLayout;
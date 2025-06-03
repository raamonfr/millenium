import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar"
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen bg-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
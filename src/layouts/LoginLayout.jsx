import { Outlet } from "react-router-dom";
import Apresentacao from "../components/cadastro/Apresentacao";

export default function LoginLayout({ children }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-28 bg-gradient-to-br from-white to-gray-100">
      <div className="w-full md:w-1/2 flex justify-end">
        <Apresentacao />
      </div>

      <div className="w-full md:w-1/2 flex justify-start">
        <Outlet />
      </div>
    </div>
  );
}
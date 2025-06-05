import { Building, Mail, MapPin } from "lucide-react";

export default function Apresentacao() {
  return (
    <div className="max-w-xl flex flex-col items-center justify-center px-8 py-12 gap-4">
      {/* Logo */}
      <div className="text-5xl font-bold text-blue-600 mb-4">
        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">M</span>
      </div>

      {/* Nome e título */}
      <h1 className="text-3xl font-extrabold text-gray-900">MILLENIUM</h1>

      {/* Subtítulo */}
      <p className="text-gray-500 mt-3 text-center">
        Junte-se à nossa plataforma e faça a diferença através de doações e vendas responsáveis.
      </p>

      {/* Lista de benefícios */}
      <div className="mt-6 space-y-3 w-full">
        <div className="flex items-center gap-3 bg-white shadow rounded-lg p-4">
          <Building className="text-white bg-green-500 p-2 w-10 h-10 rounded-full" />
          <span className="text-gray-700 text-sm font-bold">Gestão completa de produtos</span>
        </div>
        <div className="flex items-center gap-3 bg-white shadow rounded-lg p-4">
          <Mail className="text-white bg-blue-500 p-2 w-10 h-10 rounded-full" />
          <span className="text-gray-700 text-sm font-bold">Conecte-se com ONGs</span>
        </div>
        <div className="flex items-center gap-3 bg-white shadow rounded-lg p-4">
          <MapPin className="bg-green-500 text-white p-2 w-10 h-10 rounded-full" />
          <span className="text-gray-700 text-sm font-bold">Impacto social mensurável</span>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LayoutDashboard, Package, TrendingUp, FileText } from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: LayoutDashboard },
  { title: "Produtos", url: createPageUrl("Produtos"), icon: Package },
  { title: "Movimentacoes", url: createPageUrl("Movimentacoes"), icon: TrendingUp },
  { title: "Requisicoes", url: createPageUrl("Requisicoes"), icon: FileText },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      <aside className="w-72 border-r border-slate-200 bg-white shadow-md">
        
        {/* LOGO + TÍTULO  */}
        <div className="p-7 border-b border-slate-200">
          <div className="flex items-center gap-8">
            
            
            <div className="w-11 h-10 rounded-xl bg-teal-000 flex items-center justify-center shadow-md">
              <span className="text-black font-bold text-lg">SA</span>
            </div>

            {/* TÍTULOS */}
            <div className="flex flex-col leading-tight">
              <h2 className="text-xl font-bold text-slate-900">
                Sistema de Almoxarifado
              </h2>
              <p className="text-sm text-slate-600">Gestão de Estoque</p>
            </div>
          </div>
        </div>

        <nav className="p-3">
          {navigationItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-slate-700 font-semibold text-sm">AS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-000 text-sm truncate">Assistência Social</p>
              <p className="text-xs text-slate-500 truncate">Gestão de Recursos</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4 md:hidden">
          <h1 className="text-xl font-bold text-slate-800">Almoxarifado</h1>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}

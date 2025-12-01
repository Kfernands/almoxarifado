// src/utils/index.ts
export function createPageUrl(name: string) {
  const map: Record<string, string> = {
    Dashboard: "/",
    Produtos: "/produtos",
    Movimentacoes: "/movimentacoes",
    Requisicoes: "/requisicoes",
  };
  return map[name] || "/";
}

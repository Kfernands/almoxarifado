import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProdutoAlerta {
  id: string | number;
  nome: string;
  estoque_atual: number;
  estoque_minimo: number;
  status: "normal" | "alerta" | "critico";
}

interface Props {
  produtos: ProdutoAlerta[];
}

export default function AlertasEstoque({ produtos }: Props) {
  const getBadgeColor = (status: string) => {
    switch (status) {
      case "critico":
        return "bg-red-100 text-red-700 border-red-300";
      case "alerta":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
      <CardHeader className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-500 w-5 h-5" />
          <CardTitle className="text-base font-semibold text-slate-900">
            Alertas de Estoque
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {produtos.length === 0 && (
          <p className="text-sm text-slate-500 flex items-center gap-2">
            ✅ Nenhum alerta no momento
          </p>
        )}

        {produtos.map((p) => (
          <div
            key={p.id}
            className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-slate-800">{p.nome}</p>
              <p className="text-xs text-slate-500">
                Estoque: {p.estoque_atual} / Mín: {p.estoque_minimo}
              </p>
            </div>

            <Badge className={`${getBadgeColor(p.status)} px-3 py-1`}>
              {p.status === "critico" ? "Crítico" : "Baixo"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

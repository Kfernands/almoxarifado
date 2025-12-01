// src/components/dashboard/AlertCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight } from "lucide-react";

export type ProdutoAlerta = {
  id: string;
  nome: string;
  estoque_atual: number;
  estoque_minimo: number;
  status: "normal" | "alerta" | "critico";
};

type Props = {
  produtos: ProdutoAlerta[];
  onCreateRequisicao: (p: ProdutoAlerta) => void;
};

export default function AlertCard({ produtos, onCreateRequisicao }: Props) {
  const getStatusColor = (status: ProdutoAlerta["status"]) => {
    switch (status) {
      case "critico":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "alerta":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500 text-white">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <CardTitle className="text-xl">Alertas de Estoque</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        {produtos.length === 0 && (
          <p className="text-sm text-slate-500">Nenhum alerta.</p>
        )}
        {produtos.map((p) => (
          <div
            key={p.id}
            className="p-3 rounded-lg border border-slate-200 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-slate-800">{p.nome}</p>
              <p className="text-xs text-slate-500">
                Atual: {p.estoque_atual} / Mín: {p.estoque_minimo}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
              <Button
                onClick={() => onCreateRequisicao(p)}
                className="bg-blue-600 text-white"
              >
                Requisitar <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

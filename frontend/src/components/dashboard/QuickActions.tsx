import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Zap, Plus, ArrowDownCircle, ArrowUpCircle, FileText } from "lucide-react";

type Props = {
  onCadastrarProduto: () => void;
  onRegistrarEntrada: () => void;
  onRegistrarSaida: () => void;
  onGerarRelatorio: () => void;
  className?: string;
};

export default function QuickActions({
  onCadastrarProduto,
  onRegistrarEntrada,
  onRegistrarSaida,
  onGerarRelatorio,
  className = "",
}: Props) {
  // estilo base dos botões (mesmo visual que você já usa)
  const baseBtn =
    "w-full justify-start border border-slate-200 bg-white hover:bg-slate-50 " +
    "text-slate-800 rounded-xl h-11";

  return (
    <Card className={`border-0 shadow-xl bg-white/80 backdrop-blur-sm ${className}`}>
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-slate-700" />
          <CardTitle className="text-base font-semibold text-slate-800">
            Ações Rápidas
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <Button onClick={onCadastrarProduto} className={baseBtn} aria-label="Cadastrar Produto">
          <Plus className="w-4 h-4 mr-2 text-sky-600" />
          Cadastrar Produto
        </Button>

        <Button onClick={onRegistrarEntrada} className={baseBtn} aria-label="Registrar Entrada">
          <ArrowDownCircle className="w-4 h-4 mr-2 text-emerald-600" />
          Registrar Entrada
        </Button>

        <Button onClick={onRegistrarSaida} className={baseBtn} aria-label="Registrar Saída">
          <ArrowUpCircle className="w-4 h-4 mr-2 text-rose-600" />
          Registrar Saída
        </Button>

        <Button onClick={onGerarRelatorio} className={baseBtn} aria-label="Gerar Relatório">
          <FileText className="w-4 h-4 mr-2 text-violet-600" />
          Gerar Relatório
        </Button>
      </CardContent>
    </Card>
  );
}

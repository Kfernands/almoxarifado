import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function EstoqueChart({ produtos }: { produtos: any[] }) {
  const data = produtos?.slice(0, 10).map((p) => ({
    nome: p.nome?.length > 15 ? p.nome.slice(0, 15) + "..." : p.nome,
    atual: p.estoque_atual,
    minimo: p.estoque_minimo,
  }));

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
      <CardHeader className="border-b border-slate-200 pb-3">
        <CardTitle className="text-lg font-semibold text-slate-700">
          Níveis de Estoque
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div style={{ width: "100%", height: 310 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar name="Estoque Atual" dataKey="atual" fill="#2563eb" />
              <Bar name="Mínimo" dataKey="minimo" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

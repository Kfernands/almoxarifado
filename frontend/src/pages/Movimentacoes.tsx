import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Plus, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { format } from "date-fns";

export default function Movimentacoes() {
  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataMovimentacao, setDataMovimentacao] = useState(format(new Date(), "yyyy-MM-dd"));
  const [responsavel, setResponsavel] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [documento, setDocumento] = useState("");
  const queryClient = useQueryClient();

  const { data: produtos = [] } = useQuery({ queryKey: ["produtos"], queryFn: () => api.produtos.list() });
  const { data: movimentacoes = [] } = useQuery({ queryKey: ["movimentacoes"], queryFn: () => api.movimentacoes.list("-data_movimentacao") });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.movimentacoes.create(data);
      const produto = produtos.find((p: any) => p.id === data.produto_id);
      if (produto) {
        const novo = data.tipo === "entrada" ? produto.estoque_atual + data.quantidade : produto.estoque_atual - data.quantidade;
        await api.produtos.update(produto.id, { estoque_atual: Math.max(0, novo) });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimentacoes"] });
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      setShowForm(false); setProdutoId(""); setQuantidade(""); setResponsavel(""); setObservacoes(""); setDocumento("");
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const produto = produtos.find((p: any) => p.id === produtoId);
    createMutation.mutate({
      produto_id: produtoId,
      produto_nome: produto?.nome || "",
      tipo,
      quantidade: parseFloat(quantidade),
      data_movimentacao: dataMovimentacao,
      responsavel,
      observacoes,
      documento,
    });
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-teal-600 bg-clip-text text-transparent mb-2">
              Movimentações de Estoque
            </h1>
            <p className="text-slate-600">Registre entradas e saídas do almoxarifado</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Nova Movimentação
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 border-0 shadow-card bg-white/90 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">Registrar Movimentação</CardTitle>
            </CardHeader>
            <form onSubmit={submit}>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo de Movimentação</Label>
                    <div className="flex gap-2">
                      <Button type="button" variant={tipo === "entrada" ? "primary" : "outline"} onClick={() => setTipo("entrada")}>
                        <ArrowUpCircle className="w-4 h-4" /> Entrada
                      </Button>
                      <Button type="button" variant={tipo === "saida" ? "primary" : "outline"} onClick={() => setTipo("saida")}>
                        <ArrowDownCircle className="w-4 h-4" /> Saída
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Produto *</Label>
                    <select className="input" value={produtoId} onChange={(e) => setProdutoId(e.target.value)} required>
                      <option value="">Selecione...</option>
                      {produtos.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.nome} - {p.estoque_atual} {p.unidade_medida}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantidade *</Label>
                    <Input type="number" min="0.01" step="0.01" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label>Data *</Label>
                    <Input type="date" value={dataMovimentacao} onChange={(e) => setDataMovimentacao(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label>Responsável</Label>
                    <Input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Nº Documento</Label>
                    <Input value={documento} onChange={(e) => setDocumento(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Observações</Label>
                  <Textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} className="btn btn-primary">
                    Registrar Movimentação
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        )}

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl font-bold text-slate-800">Histórico de Movimentações</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {movimentacoes.map((mov: any) => (
                <div key={mov.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:shadow-card transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl ${mov.tipo === "entrada" ? "bg-gradient-to-br from-emerald-500 to-teal-500" : "bg-gradient-to-br from-rose-500 to-orange-500"}`}>
                        {mov.tipo === "entrada" ? <TrendingUp className="w-5 h-5 text-white" /> : <TrendingDown className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{mov.produto_nome}</h4>
                        <p className="text-sm text-slate-500 mt-1">{new Date(mov.data_movimentacao).toLocaleDateString("pt-BR")}</p>
                        {mov.responsavel && <p className="text-xs text-slate-400 mt-1">Por: {mov.responsavel}</p>}
                        {mov.observacoes && <p className="text-sm text-slate-600 mt-2">{mov.observacoes}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={mov.tipo === "entrada" ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-rose-100 text-rose-800 border-rose-300"}>
                        {mov.tipo === "entrada" ? "+" : "-"} {mov.quantidade}
                      </Badge>
                      {mov.documento && <p className="text-xs text-slate-400 mt-2">Doc: {mov.documento}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

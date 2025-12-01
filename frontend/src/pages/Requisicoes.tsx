import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, XCircle, Clock, ShoppingCart } from "lucide-react";


type Status = "pendente" | "aprovada" | "em_compra" | "concluida" | "cancelada";
type StatusFilter = "all" | Status;
type Prioridade = "baixa" | "media" | "alta" | "urgente";

type Requisicao = {
  id: string;
  produto_id: string;
  produto_nome: string;
  quantidade_solicitada: number;
  estoque_atual?: number;
  estoque_minimo?: number;
  prioridade?: Prioridade;
  status: Status;
  justificativa?: string;
  observacoes?: string;
  created_date?: string;
};



export default function Requisicoes() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const queryClient = useQueryClient();

  const { data: requisicoes = [] } = useQuery<Requisicao[]>({
    queryKey: ["requisicoes"],
    queryFn: () => api.requisicoes.list("-created_date"),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) =>
      api.requisicoes.update(id, { status }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["requisicoes"] }),
  });

  const filteredRequisicoes =
    statusFilter === "all"
      ? requisicoes
      : requisicoes.filter((r) => r.status === statusFilter);

  const getStatusConfig = (status: Status) => {
    switch (status) {
      case "pendente":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-300",
          icon: Clock,
          label: "Pendente",
        };
      case "aprovada":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-300",
          icon: CheckCircle,
          label: "Aprovada",
        };
      case "em_compra":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-300",
          icon: ShoppingCart,
          label: "Em Compra",
        };
      case "concluida":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-300",
          icon: CheckCircle,
          label: "Concluída",
        };
      case "cancelada":
        return {
          color: "bg-slate-100 text-slate-800 border-slate-300",
          icon: XCircle,
          label: "Cancelada",
        };
    }
  };

  const getPrioridadeColor = (prioridade?: Prioridade) => {
    switch (prioridade) {
      case "urgente":
        return "bg-rose-500 text-white";
      case "alta":
        return "bg-orange-500 text-white";
      case "media":
        return "bg-yellow-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-teal-600 bg-clip-text text-transparent mb-2">
            Requisições de Compra
          </h1>
          <p className="text-slate-600">
            Gerencie solicitações de reposição de estoque
          </p>
        </div>

        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border-0">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">
              Filtrar por Status:
            </label>
            <select
              className="input w-48"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="all">Todos</option>
              <option value="pendente">Pendentes</option>
              <option value="aprovada">Aprovadas</option>
              <option value="em_compra">Em Compra</option>
              <option value="concluida">Concluídas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredRequisicoes.map((req) => {
            const statusConfig = getStatusConfig(req.status);
            const StatusIcon = statusConfig.icon as any;

            return (
              <Card
                key={req.id}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <CardHeader className="border-b border-slate-100 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500">
                        <StatusIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-800">
                          {req.produto_nome}
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">
                          Criado em{" "}
                          {req.created_date
                            ? new Date(req.created_date).toLocaleString(
                                "pt-BR"
                              )
                            : "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPrioridadeColor(req.prioridade)}>
                        {req.prioridade === "urgente"
                          ? "Urgente"
                          : req.prioridade === "alta"
                          ? "Alta"
                          : req.prioridade === "media"
                          ? "Média"
                          : "Baixa"}
                      </Badge>
                      <Badge className={statusConfig.color}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Quantidade Solicitada
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {req.quantidade_solicitada}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Estoque Atual / Mínimo
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {req.estoque_atual ?? "-"} / {req.estoque_minimo ?? "-"}
                      </p>
                    </div>
                  </div>

                  {req.justificativa && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        Justificativa:
                      </p>
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">
                        {req.justificativa}
                      </p>
                    </div>
                  )}

                  {req.status === "pendente" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: req.id,
                            status: "aprovada",
                          })
                        }
                        className="btn btn-primary"
                      >
                        Aprovar
                      </Button>
                      <Button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: req.id,
                            status: "cancelada",
                          })
                        }
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}

                  {req.status === "aprovada" && (
                    <Button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: req.id,
                          status: "em_compra",
                        })
                      }
                      className="w-full btn btn-primary"
                    >
                      Marcar como Em Compra
                    </Button>
                  )}

                  {req.status === "em_compra" && (
                    <Button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: req.id,
                          status: "concluida",
                        })
                      }
                      className="w-full btn btn-primary"
                    >
                      Marcar como Concluída
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredRequisicoes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500 text-lg">Nenhuma requisição encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}

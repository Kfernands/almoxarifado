import React, { useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import StatsCard from "@/components/dashboard/StatsCard";
import AlertCard, { type ProdutoAlerta } from "@/components/dashboard/AlertCard";
import EstoqueChart from "@/components/dashboard/EstoqueChart";
import { Package, AlertTriangle, TrendingUp, ShoppingCart } from "lucide-react";

type Produto = {
  id: string;
  nome: string;
  estoque_atual: number;
  estoque_minimo: number;
  estoque_maximo?: number;
  custo_unitario?: number;
  unidade_medida?: string;
  status: "normal" | "alerta" | "critico"; 
};

export default function Dashboard() {
  const queryClient = useQueryClient();

  // Produtos
  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => api.produtos.list(),
  });

 
  const { data: movimentacoes = [] } = useQuery({
    queryKey: ["movimentacoes"],
    queryFn: () => api.movimentacoes.list(), 
  });

  const updateProduto = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Produto> }) =>
      api.produtos.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["produtos"] }),
  });

  useEffect(() => {
   
    if (updateProduto.isPending) return;

    (produtos as Produto[]).forEach((produto) => {
      const novoStatus: Produto["status"] =
        produto.estoque_atual === 0
          ? "critico"
          : produto.estoque_atual <= produto.estoque_minimo
          ? "alerta"
          : "normal";

      if (novoStatus !== produto.status) {
        updateProduto.mutate({ id: produto.id, data: { status: novoStatus } });
      }
    });
    
  }, [produtos]);

  const totalProdutos = produtos.length;

  const valorTotalEstoque = (produtos as Produto[]).reduce(
    (sum, p) => sum + (p.estoque_atual || 0) * (p.custo_unitario || 0),
    0
  );

  const movimentacoesRecentes = (movimentacoes || []).slice(0, 5);

 
  const produtosAlertaMin: ProdutoAlerta[] = useMemo(() => {
    return (produtos as Produto[])
      .filter((p) => p.status === "alerta" || p.status === "critico")
      .map((p) => ({
        id: p.id,
        nome: p.nome,
        estoque_atual: Number(p.estoque_atual || 0),
        estoque_minimo: Number(p.estoque_minimo || 0),
        status: p.status, // já é "alerta" | "critico"
      }));
  }, [produtos]);

  const createRequisicao = useMutation({
    mutationFn: (data: any) => api.requisicoes.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["requisicoes"] }),
  });

  const handleCreateRequisicao = async (produto: ProdutoAlerta) => {
    const original = (produtos as Produto[]).find((p) => p.id === produto.id);
    const estoqueMax = original?.estoque_maximo ?? produto.estoque_minimo * 2;
    const quantidadeSugerida = Math.max(1, estoqueMax - produto.estoque_atual);

    const prioridade =
      produto.estoque_atual === 0
        ? "urgente"
        : produto.estoque_atual <= produto.estoque_minimo * 0.25
        ? "alta"
        : produto.estoque_atual <= produto.estoque_minimo * 0.5
        ? "media"
        : "baixa";

    await createRequisicao.mutateAsync({
      produto_id: produto.id,
      produto_nome: produto.nome,
      quantidade_solicitada: quantidadeSugerida,
      estoque_atual: produto.estoque_atual,
      estoque_minimo: produto.estoque_minimo,
      status: "pendente",
      prioridade,
      justificativa: `Estoque abaixo do mínimo. Atual: ${produto.estoque_atual}`,
    });
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-teal-600 bg-clip-text text-transparent mb-2">
            Painel de Controle
          </h1>
          <p className="text-slate-600">Visão geral do almoxarifado e estoque</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total de Produtos" value={totalProdutos} icon={Package} />
          <StatsCard title="Produtos em Alerta" value={produtosAlertaMin.length} icon={AlertTriangle} />
          <StatsCard title="Valor Total" value={`R$ ${valorTotalEstoque.toFixed(2)}`} icon={ShoppingCart} />
          <StatsCard title="Movimentações Hoje" value={movimentacoesRecentes.length} icon={TrendingUp} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EstoqueChart produtos={produtos as Produto[]} />
          </div>
          <div>
            <AlertCard
              produtos={produtosAlertaMin}
              onCreateRequisicao={handleCreateRequisicao}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

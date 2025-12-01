import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import ProdutoForm from "@/components/produtos/ProdutoForm";
import ProdutoCard from "@/components/produtos/ProdutoCard";
import { Package, Filter, Search } from "lucide-react";

export default function Produtos() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data: produtos = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => api.produtos.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.produtos.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      setShowForm(false);
      setEditingProduto(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.produtos.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      setShowForm(false);
      setEditingProduto(null);
    },
  });

  const handleSave = (data: any) => {
    if (editingProduto) updateMutation.mutate({ id: editingProduto.id, data });
    else createMutation.mutate(data);
  };

  const handleEdit = (produto: any) => {
    setEditingProduto(produto);
    setShowForm(true);
  };

  const filteredProdutos = produtos.filter((produto: any) => {
    const matchesSearch =
      (produto.nome || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (produto.categoria || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || produto.categoria === categoryFilter;
    const matchesStatus = statusFilter === "all" || produto.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-teal-600 bg-clip-text text-transparent mb-2">
              Gestão de Produtos
            </h1>
            <p className="text-slate-600">Cadastro e controle de itens do almoxarifado</p>
          </div>
          <Button onClick={() => { setEditingProduto(null); setShowForm(true); }} className="btn btn-primary">
            Novo Produto
          </Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ProdutoForm
              produto={editingProduto}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingProduto(null); }}
              isProcessing={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        )}

        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border-0">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold text-slate-800">Filtros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input">
              <option value="all">Todas as Categorias</option>
              <option>Alimentos</option><option>Higiene e Limpeza</option><option>Material de Escritório</option><option>Material de Construção</option><option>Vestuário</option><option>Medicamentos</option><option>Outros</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input">
              <option value="all">Todos os Status</option>
              <option value="normal">Normal</option>
              <option value="alerta">Alerta</option>
              <option value="critico">Crítico</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProdutos.map((produto: any, index: number) => (
            <ProdutoCard key={produto.id} produto={produto} onEdit={handleEdit} index={index} />
          ))}
        </div>

        {filteredProdutos.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500 text-lg">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

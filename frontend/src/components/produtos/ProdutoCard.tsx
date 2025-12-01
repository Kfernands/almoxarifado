import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { Package, Pencil, TrendingDown, AlertTriangle } from 'lucide-react';

export default function ProdutoCard({ produto, onEdit, index }:{produto:any; onEdit:(p:any)=>void; index:number}) {
  const getStatusConfig = (status:string) => {
    switch (status) {
      case 'critico': return { color:'bg-rose-100 text-rose-800 border-rose-300', icon: AlertTriangle, label:'Crítico'};
      case 'alerta': return { color:'bg-amber-100 text-amber-800 border-amber-300', icon: TrendingDown, label:'Alerta'};
      default: return { color:'bg-emerald-100 text-emerald-800 border-emerald-300', icon: Package, label:'Normal'};
    }
  };
  const cfg = getStatusConfig(produto.status);
  const Icon = cfg.icon as any;
  const percentual = produto.estoque_minimo>0 ? Math.min(100, (produto.estoque_atual / produto.estoque_minimo) * 100) : 100;

  return (
    <Card className="border-0 shadow bg-white/80">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className={`p-3 rounded-xl ${produto.status==='critico'?'bg-rose-500': produto.status==='alerta'?'bg-amber-500':'bg-blue-600'} text-white`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{produto.nome}</h3>
              <p className="text-sm text-slate-500">{produto.categoria}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={()=>onEdit(produto)}><Pencil className="w-4 h-4" /></Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Estoque Atual:</span>
            <span className="font-bold text-slate-800">{produto.estoque_atual} {produto.unidade_medida}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className={`h-full rounded-full ${percentual<25?'bg-rose-500': percentual<75?'bg-amber-500':'bg-emerald-500'}`} style={{width:`${percentual}%`}} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Mínimo: {produto.estoque_minimo}</span>
            {produto.estoque_maximo>0 && <span>Máximo: {produto.estoque_maximo}</span>}
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <Badge className={cfg.color}>{cfg.label}</Badge>
            {produto.custo_unitario>0 && <span className="text-sm font-semibold text-slate-700">R$ {produto.custo_unitario.toFixed(2)}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

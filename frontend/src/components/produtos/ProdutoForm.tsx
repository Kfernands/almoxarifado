import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { Save, X } from 'lucide-react';

const categorias = ["Alimentos","Higiene e Limpeza","Material de Escritório","Material de Construção","Vestuário","Medicamentos","Outros"];
const unidades = ["Unidade","Caixa","Kg","Litro","Pacote","Fardo"];

export default function ProdutoForm({ produto, onSave, onCancel, isProcessing }:{produto?:any; onSave:(d:any)=>void; onCancel:()=>void; isProcessing?:boolean}) {
  const [form, setForm] = useState<any>(produto || {
    nome:'', categoria:'', unidade_medida:'', estoque_atual:0, estoque_minimo:0, estoque_maximo:0, custo_unitario:0, descricao:'', fornecedor:'', status:'normal'
  });

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Card className="border-0 shadow-2xl bg-white/90">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle>{produto ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
      </CardHeader>
      <form onSubmit={submit}>
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input value={form.nome} onChange={e=>setForm({...form, nome:e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Categoria *</Label>
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.categoria} onChange={e=>setForm({...form, categoria:e.target.value})} required>
                <option value="">Selecione...</option>
                {categorias.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Unidade *</Label>
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.unidade_medida} onChange={e=>setForm({...form, unidade_medida:e.target.value})} required>
                <option value="">Selecione...</option>
                {unidades.map(u=> <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Fornecedor</Label>
              <Input value={form.fornecedor||''} onChange={e=>setForm({...form, fornecedor:e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Estoque Atual</Label>
              <Input type="number" value={form.estoque_atual} onChange={e=>setForm({...form, estoque_atual: parseFloat(e.target.value)||0})} />
            </div>
            <div className="space-y-2">
              <Label>Estoque Mínimo *</Label>
              <Input type="number" required value={form.estoque_minimo} onChange={e=>setForm({...form, estoque_minimo: parseFloat(e.target.value)||0})} />
            </div>
            <div className="space-y-2">
              <Label>Estoque Máximo</Label>
              <Input type="number" value={form.estoque_maximo} onChange={e=>setForm({...form, estoque_maximo: parseFloat(e.target.value)||0})} />
            </div>
            <div className="space-y-2">
              <Label>Custo Unitário (R$)</Label>
              <Input type="number" step="0.01" value={form.custo_unitario} onChange={e=>setForm({...form, custo_unitario: parseFloat(e.target.value)||0})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea value={form.descricao||''} onChange={e=>setForm({...form, descricao:e.target.value})} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}><X className="w-4 h-4" /> Cancelar</Button>
          <Button type="submit" className="bg-blue-600 text-white" disabled={isProcessing}><Save className="w-4 h-4" /> Salvar</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

from typing import Optional
from datetime import datetime

from pydantic import BaseModel


class RequisicaoBase(BaseModel):
    produto_id: str
    produto_nome: str
    quantidade_solicitada: int
    estoque_atual: Optional[int] = None
    estoque_minimo: Optional[int] = None
    prioridade: Optional[str] = "media"
    status: str = "pendente"
    justificativa: Optional[str] = None
    observacoes: Optional[str] = None


class RequisicaoCreate(RequisicaoBase):
    pass


class RequisicaoUpdate(BaseModel):
    quantidade_solicitada: Optional[int] = None
    prioridade: Optional[str] = None
    status: Optional[str] = None
    justificativa: Optional[str] = None
    observacoes: Optional[str] = None


class RequisicaoOut(RequisicaoBase):
    id: str
    created_date: datetime

    class Config:
        orm_mode = True

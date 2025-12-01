from typing import Optional
from datetime import datetime

from pydantic import BaseModel


class MovimentacaoBase(BaseModel):
    produto_id: str
    produto_nome: str
    tipo: str
    quantidade: int
    responsavel: Optional[str] = None
    observacoes: Optional[str] = None
    documento: Optional[str] = None


class MovimentacaoCreate(MovimentacaoBase):
    pass


class MovimentacaoOut(MovimentacaoBase):
    id: str
    data_movimentacao: datetime

    class Config:
        orm_mode = True

from typing import Optional

from pydantic import BaseModel


class ProdutoBase(BaseModel):
    nome: str
    categoria: Optional[str] = None
    unidade_medida: Optional[str] = None
    estoque_atual: int = 0
    estoque_minimo: int = 0
    estoque_maximo: Optional[int] = None
    custo_unitario: Optional[float] = None
    status: str = "normal"


class ProdutoCreate(ProdutoBase):
    pass


class ProdutoUpdate(BaseModel):
    nome: Optional[str] = None
    categoria: Optional[str] = None
    unidade_medida: Optional[str] = None
    estoque_atual: Optional[int] = None
    estoque_minimo: Optional[int] = None
    estoque_maximo: Optional[int] = None
    custo_unitario: Optional[float] = None
    status: Optional[str] = None


class ProdutoOut(ProdutoBase):
    id: str

    class Config:
        orm_mode = True

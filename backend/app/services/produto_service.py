from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.produto import Produto
from app.schemas.produto_schema import ProdutoCreate, ProdutoUpdate


def listar_produtos(db: Session) -> List[Produto]:
    return db.query(Produto).all()


def obter_produto(db: Session, produto_id: str) -> Optional[Produto]:
    return db.query(Produto).filter(Produto.id == produto_id).first()


def criar_produto(db: Session, produto_in: ProdutoCreate) -> Produto:
    produto = Produto(**produto_in.dict())
    db.add(produto)
    db.commit()
    db.refresh(produto)
    return produto


def atualizar_produto(db: Session, produto_id: str, produto_in: ProdutoUpdate) -> Optional[Produto]:
    produto = obter_produto(db, produto_id)
    if not produto:
        return None

    dados = produto_in.dict(exclude_unset=True)
    for campo, valor in dados.items():
        setattr(produto, campo, valor)

    db.commit()
    db.refresh(produto)
    return produto


def deletar_produto(db: Session, produto_id: str) -> bool:
    produto = obter_produto(db, produto_id)
    if not produto:
        return False

    db.delete(produto)
    db.commit()
    return True

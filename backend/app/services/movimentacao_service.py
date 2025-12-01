from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.movimentacao import Movimentacao
from app.models.produto import Produto
from app.schemas.movimentacao_schema import MovimentacaoCreate


def listar_movimentacoes(db: Session, limit: Optional[int] = None) -> List[Movimentacao]:
    query = db.query(Movimentacao).order_by(Movimentacao.data_movimentacao.desc())
    if limit:
        query = query.limit(limit)
    return query.all()


def criar_movimentacao(db: Session, mov_in: MovimentacaoCreate) -> Optional[Movimentacao]:
    produto = db.query(Produto).filter(Produto.id == mov_in.produto_id).first()
    if not produto:
        return None

    if mov_in.tipo == "entrada":
        produto.estoque_atual += mov_in.quantidade
    else:
        produto.estoque_atual = max(0, produto.estoque_atual - mov_in.quantidade)

    mov = Movimentacao(
        produto_id=mov_in.produto_id,
        produto_nome=mov_in.produto_nome,
        tipo=mov_in.tipo,
        quantidade=mov_in.quantidade,
        responsavel=mov_in.responsavel,
        observacoes=mov_in.observacoes,
        documento=mov_in.documento,
    )

    db.add(mov)
    db.commit()
    db.refresh(mov)
    return mov


def deletar_movimentacao(db: Session, movimentacao_id: str) -> bool:
    mov = db.query(Movimentacao).filter(Movimentacao.id == movimentacao_id).first()
    if not mov:
        return False

    db.delete(mov)
    db.commit()
    return True

from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.requisicao import Requisicao
from app.schemas.requisicao_schema import RequisicaoCreate, RequisicaoUpdate


def listar_requisicoes(db: Session) -> List[Requisicao]:
    return db.query(Requisicao).order_by(Requisicao.created_date.desc()).all()


def criar_requisicao(db: Session, req_in: RequisicaoCreate) -> Requisicao:
    req = Requisicao(**req_in.dict())
    db.add(req)
    db.commit()
    db.refresh(req)
    return req


def atualizar_requisicao(db: Session, req_id: str, req_in: RequisicaoUpdate) -> Optional[Requisicao]:
    req = db.query(Requisicao).filter(Requisicao.id == req_id).first()
    if not req:
        return None

    dados = req_in.dict(exclude_unset=True)
    for campo, valor in dados.items():
        setattr(req, campo, valor)

    db.commit()
    db.refresh(req)
    return req


def deletar_requisicao(db: Session, req_id: str) -> bool:
    req = db.query(Requisicao).filter(Requisicao.id == req_id).first()
    if not req:
        return False

    db.delete(req)
    db.commit()
    return True

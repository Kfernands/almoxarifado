from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.movimentacao_schema import MovimentacaoCreate, MovimentacaoOut
from app.services import movimentacao_service

router = APIRouter(
    prefix="/movimentacoes",
    tags=["Movimentações"],
)


@router.get("/", response_model=list[MovimentacaoOut])
def listar_movimentacoes(
    limit: Optional[int] = None,
    db: Session = Depends(get_db),
):
    return movimentacao_service.listar_movimentacoes(db, limit=limit)


@router.post("/", response_model=MovimentacaoOut, status_code=status.HTTP_201_CREATED)
def criar_movimentacao(mov_in: MovimentacaoCreate, db: Session = Depends(get_db)):
    mov = movimentacao_service.criar_movimentacao(db, mov_in)
    if not mov:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produto não encontrado para a movimentação",
        )
    return mov


@router.delete("/{movimentacao_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_movimentacao(movimentacao_id: str, db: Session = Depends(get_db)):
    ok = movimentacao_service.deletar_movimentacao(db, movimentacao_id)
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movimentação não encontrada",
        )
    return

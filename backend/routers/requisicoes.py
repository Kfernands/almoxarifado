from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.requisicao_schema import (
    RequisicaoCreate,
    RequisicaoUpdate,
    RequisicaoOut,
)
from app.services import requisicao_service

router = APIRouter(
    prefix="/requisicoes",
    tags=["Requisições"],
)


@router.get("/", response_model=list[RequisicaoOut])
def listar_requisicoes(db: Session = Depends(get_db)):
    return requisicao_service.listar_requisicoes(db)


@router.post("/", response_model=RequisicaoOut, status_code=status.HTTP_201_CREATED)
def criar_requisicao(req_in: RequisicaoCreate, db: Session = Depends(get_db)):
    return requisicao_service.criar_requisicao(db, req_in)


@router.put("/{req_id}", response_model=RequisicaoOut)
def atualizar_requisicao(req_id: str, req_in: RequisicaoUpdate, db: Session = Depends(get_db)):
    req = requisicao_service.atualizar_requisicao(db, req_id, req_in)
    if not req:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Requisição não encontrada",
        )
    return req


@router.delete("/{req_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_requisicao(req_id: str, db: Session = Depends(get_db)):
    ok = requisicao_service.deletar_requisicao(db, req_id)
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Requisição não encontrada",
        )
    return

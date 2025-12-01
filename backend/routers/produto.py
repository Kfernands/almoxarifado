from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.produto_schema import ProdutoCreate, ProdutoUpdate, ProdutoOut
from app.services import produto_service

router = APIRouter(
    prefix="/produtos",
    tags=["Produtos"],
)


@router.get("/", response_model=list[ProdutoOut])
def listar_produtos(db: Session = Depends(get_db)):
    return produto_service.listar_produtos(db)


@router.get("/{produto_id}", response_model=ProdutoOut)
def obter_produto(produto_id: str, db: Session = Depends(get_db)):
    produto = produto_service.obter_produto(db, produto_id)
    if not produto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produto não encontrado",
        )
    return produto


@router.post("/", response_model=ProdutoOut, status_code=status.HTTP_201_CREATED)
def criar_produto(produto_in: ProdutoCreate, db: Session = Depends(get_db)):
    return produto_service.criar_produto(db, produto_in)


@router.put("/{produto_id}", response_model=ProdutoOut)
def atualizar_produto(produto_id: str, produto_in: ProdutoUpdate, db: Session = Depends(get_db)):
    produto = produto_service.atualizar_produto(db, produto_id, produto_in)
    if not produto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produto não encontrado",
        )
    return produto


@router.delete("/{produto_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_produto(produto_id: str, db: Session = Depends(get_db)):
    ok = produto_service.deletar_produto(db, produto_id)
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produto não encontrado",
        )
    return

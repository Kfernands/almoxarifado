from uuid import uuid4
from datetime import datetime

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Movimentacao(Base):
    __tablename__ = "movimentacoes"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid4()))
    produto_id = Column(String, ForeignKey("produtos.id"), nullable=False)
    produto_nome = Column(String, nullable=False)
    tipo = Column(String, nullable=False)  # entrada | saida
    quantidade = Column(Integer, nullable=False)
    data_movimentacao = Column(DateTime, default=datetime.utcnow)
    responsavel = Column(String, nullable=True)
    observacoes = Column(String, nullable=True)
    documento = Column(String, nullable=True)
    produto = relationship("Produto", back_populates="movimentacoes")

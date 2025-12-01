from uuid import uuid4
from datetime import datetime

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Requisicao(Base):
    __tablename__ = "requisicoes"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid4()))
    produto_id = Column(String, ForeignKey("produtos.id"), nullable=False)
    produto_nome = Column(String, nullable=False)
    quantidade_solicitada = Column(Integer, nullable=False)
    estoque_atual = Column(Integer, nullable=True)
    estoque_minimo = Column(Integer, nullable=True)
    prioridade = Column(String, nullable=True)  # baixa | media | alta | urgente
    status = Column(String, nullable=False, default="pendente")
    justificativa = Column(String, nullable=True)
    observacoes = Column(String, nullable=True)
    created_date = Column(DateTime, default=datetime.utcnow)
    produto = relationship("Produto", back_populates="requisicoes")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.utils.error_handler import add_exception_handlers

from routers.produto import router as produto_router
from routers.movimentacao import router as movimentacao_router
from routers.requisicoes import router as requisicoes_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Almoxarifado")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

add_exception_handlers(app)

app.include_router(produto_router)
app.include_router(movimentacao_router)
app.include_router(requisicoes_router)

import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  produtos: {
    list: async () => {
      const res = await client.get("/produtos");
      return res.data;
    },
    create: async (data: any) => {
      const res = await client.post("/produtos", data);
      return res.data;
    },
    update: async (id: string, data: any) => {
      const res = await client.put(`/produtos/${id}`, data);
      return res.data;
    },
    delete: async (id: string) => {
      const res = await client.delete(`/produtos/${id}`);
      return res.data;
    },
  },

  movimentacoes: {
    list: async () => {
      const res = await client.get("/movimentacoes");
      return res.data;
    },
    create: async (data: any) => {
      const res = await client.post("/movimentacoes", data);
      return res.data;
    },
    delete: async (id: string) => {
      const res = await client.delete(`/movimentacoes/${id}`);
      return res.data;
    },
  },

  requisicoes: {
    list: async () => {
      const res = await client.get("/requisicoes");
      return res.data;
    },
    create: async (data: any) => {
      const res = await client.post("/requisicoes", data);
      return res.data;
    },
    update: async (id: string, data: any) => {
      const res = await client.put(`/requisicoes/${id}`, data);
      return res.data;
    },
    delete: async (id: string) => {
      const res = await client.delete(`/requisicoes/${id}`);
      return res.data;
    },
  },
};

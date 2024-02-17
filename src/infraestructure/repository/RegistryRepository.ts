import axios from "axios";

export const registryRepository = {
  findAll: async (token: string) => {
    const { data } = await axios.get(`${process.env.API_URL}/registry`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  findOne: async (id: number, token: string) => {
    const { data } = await axios.get(`${process.env.API_URL}/registry/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  findOnebyTimeSheet: async (sheet_id: number, token: string) => {
    const { data } = await axios.get(
      `${process.env.API_URL}/registry?sheet=${sheet_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  create: async (body: any, token: string) => {
    const { data } = await axios.post(
      `${process.env.API_URL}/registry`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  update: async (id: number, body: any, token: string) => {
    const { data } = await axios.put(
      `${process.env.API_URL}/registry/${id}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  },
  delete: async (id: number, token: string) => {
    const { data } = await axios.delete(
      `${process.env.API_URL}/registry/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
};

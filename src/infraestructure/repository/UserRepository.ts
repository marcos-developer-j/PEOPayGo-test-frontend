import axios from "axios";
export const userRepository = {
  findAll: async (token: string) => {
    const { data } = await axios.get(`${process.env.API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
  findOne: async (id: number, token: string) => {
    const { data } = await axios.get(`${process.env.API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
  findMe: async (token: string) => {
    const { data } = await axios.get(`${process.env.API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
  create: async (body: any, token: string) => {
    const { data } = await axios.post(`${process.env.API_URL}/user`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
  update: async (id: number, body: any, token: string) => {
    const { data } = await axios.put(
      `${process.env.API_URL}/user/${id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  delete: async (id: number, token: string) => {
    const { data } = await axios.delete(`${process.env.API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
};

import axios from "axios";
export const timesheetRepository = {
  findAll: async (token: string) => {
    const { data } = await axios.get(`${process.env.API_URL}/registry/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
  findOne: async (id: number, token: string) => {
    const { data } = await axios.get(`${process.env.API_URL}/registry/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },
  findOnebyUser: async (id: number, token: string) => {
    const { data } = await axios.get(
      `${process.env.API_URL}/registry?user=${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  update: async (id: number, body: any, token: string) => {
    const { data } = await axios.put(
      `${process.env.API_URL}/registry/${id}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  create: async (body: any, token: string) => {
    const { data } = await axios.post(
      `${process.env.API_URL}/registry/`,
      body,
      { headers: { Authorization: `Bearer ${token}` } }
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

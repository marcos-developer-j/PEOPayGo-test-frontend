import axios from "axios";
export const AuthRepository = {
  Login: async (email: string, password: string) => {
    const { data } = await axios.post(`${process.env.API_URL}/auth/login`, {
      email: email,
      password: password,
    });
    return data;
  },
};

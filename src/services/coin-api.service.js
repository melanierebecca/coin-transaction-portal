import axios from "axios";

export const register = async ({ username, name, email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COIN_API_URL}/auth/register`,
      {
        username,
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COIN_API_URL}/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tokenTransfer = async ({ token, amount, toAddress }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_COIN_API_URL}/transactions/token-transfer`,
      {
        coin: 1,
        amount,
        toAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

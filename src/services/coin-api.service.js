import axios from "axios";

export const register = async ({
    username,
    name,
    email,
  }) => {
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
    return response
  } catch (error) {
    throw error
  }
};

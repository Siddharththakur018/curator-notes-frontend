import axiosClient from "@/client/axios";

export const syncUser = async (token: string) => {
  const response = await axiosClient.post(
    "/auth/sync-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

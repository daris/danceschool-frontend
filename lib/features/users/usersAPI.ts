import api from "@/lib/api/axios";
import {UsersApiResponse} from "@/lib/features/users/types";

// Fetch all users
export const fetchUsers = async (): Promise<UsersApiResponse> => {
  const { data } = await api.get<UsersApiResponse>("/users");
  return data;
};
import api from "@/lib/api/axios";
import {User} from "@/lib/features/users/types";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};
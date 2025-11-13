import api from "@/lib/api/axios";

export interface UserPass {
  id: string;
  startTime: string;
  endTime: string;
  courseIds: string[];
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  passes: UserPass[];
}

export interface EmbeddedUsers {
  users: User[];
}

export interface UsersApiResponse {
  _embedded: EmbeddedUsers;
  total: number;
  skip: number;
  limit: number;
}

// Fetch all users
export const fetchUsers = async (): Promise<UsersApiResponse> => {
  const { data } = await api.get<UsersApiResponse>("/users");
  return data;
};
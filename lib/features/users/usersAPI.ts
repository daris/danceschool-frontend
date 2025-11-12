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

// A mock function to mimic making an async request for data
export const fetchUsers = async () => {
  const response = await fetch("http://localhost:8080/users", {
    headers: { "Content-Type": "application/json" },
  });
  const result: UsersApiResponse = await response.json();

  return result;
};

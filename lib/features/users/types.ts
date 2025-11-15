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
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

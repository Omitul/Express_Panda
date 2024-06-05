export type Tuser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

//partial or optional use kore disi oikhane
// export type NewUser = {
//   password: string;
//   role: string;
//   id: string;
// };

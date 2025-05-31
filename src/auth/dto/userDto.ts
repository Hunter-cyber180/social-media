// create user interface
export interface User {
  email: string;
  password: string;
}

// create user register dto
export interface UserRegister extends User {
  name: string;
  username: string;
}

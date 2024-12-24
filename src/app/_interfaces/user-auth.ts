export interface ResponseAPI {
  user:  User;
  token: string;
}

export interface User {
  id:        number;
  rut:       string;
  name:      string;
  email:     string;
  birthdate: Date;
  active:    boolean;
  gender:    Gender;
  rol:       Rol;
}

export interface Gender {
  id:   number;
  type: string;
}

export interface Rol {
  id:   number;
  name: string;
}

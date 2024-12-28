export interface ResponseAPIGetUsers {
  result:                  Result[];
  id:                      number;
  exception:               null;
  status:                  number;
  isCanceled:              boolean;
  isCompleted:             boolean;
  isCompletedSuccessfully: boolean;
  creationOptions:         number;
  asyncState:              null;
  isFaulted:               boolean;
}

export interface Result {
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

export interface addUser {
  rut:             string;
  name:            string;
  birthday:        Date;
  Email:           string;
  GenderId:        number;
  password:        string;
  ConfirmPassword: string;
}

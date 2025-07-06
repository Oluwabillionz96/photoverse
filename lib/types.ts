export interface LoginInfo {
  email: string;
  password: string;
}


export interface ViewPassword {
  loginPassword: boolean;
  registerPassword: boolean;
  confirmPassword: boolean;
}

export interface RegisterInfo {
  email: string;
  password: string;
  confirmedPassword: string;
}
  

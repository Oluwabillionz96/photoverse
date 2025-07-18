import { LoginInfo, RegisterInfo } from "../types";

export function validateLoginInfo(
  loginInfo: LoginInfo,
  setLoginError: (arg: { email: string; password: string }) => void,
  loginError: { email: string; password: string }
) {
  const { email } = loginInfo;
  const error = true;
  if (!email.includes("@") || !email.includes(".com")) {
    setLoginError({
      ...loginError,
      email: "The email address you provided is not valid",
    });
    return error;
  }

  return;
}

export function VerifyRegisterationData(
  formData: RegisterInfo,
  setRegisterError: (arg: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void,
  registerError: {
    email: string;
    password: string;
    confirmPassword: string;
  }
) {
  const { email, password, confirmedPassword } = formData;
  const error = true;

  if (!email.includes("@") || !email.includes(".com")) {
    setRegisterError({
      ...registerError,
      email: "The email address you provided is not valid",
    });
    return error;
  }

  if (!/[A-Z]/.test(password)) {
    setRegisterError({
      ...registerError,
      password: "Add an uppercase letter",
    });
    return error;
  }

  if (!/[a-z]/.test(password)) {
    setRegisterError({
      ...registerError,
      password: "Add a lowercase letter",
    });

    return error;
  }

  if (!/\d/.test(password)) {
    setRegisterError({
      ...registerError,
      password: "Add a number letter",
    });

    return error;
  }

  if (!/[\W_]/.test(password)) {
    setRegisterError({
      ...registerError,
      password: "Add a special character",
    });

    return error;
  }

  if (!(password.length >= 8)) {
    setRegisterError({
      ...registerError,
      password: "Password must be 8+ characters",
    });

    return error;
  }

  if (confirmedPassword !== password) {
    setRegisterError({
      ...registerError,
      confirmPassword: "Passwords doesn't match",
    });

    return error;
  }

  return;
}

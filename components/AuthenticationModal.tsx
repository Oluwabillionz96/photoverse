"use client";
import { useState } from "react";

const AuthenticationModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [viewPassword, setUsePassword] = useState(false);
  return (
    <div className="absolute top-[20rem] left-[10rem]">
      <header>{isLogin ? "Login to Your Account" : "Create an Account"}</header>
      <form action="">
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="off"
            />
          </div>
        </div>
        {isLogin && (
          <div>
            <div>
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Forgot Password?</p>
          </div>
        )}
        <button>{isLogin ? "Sign In" : "Sign Up"}</button>
      </form>
      <div>
        <div></div>
        or
        <div></div>
      </div>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create New Account" : "Login"}
      </button>
    </div>
  );
};

export default AuthenticationModal;

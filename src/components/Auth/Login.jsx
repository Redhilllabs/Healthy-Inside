import React, { useState } from "react";
import "./login.css";
import GoogleButton from "./GoogleButton";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { useNavigate } from "react-router-dom";
import { LoginAPi } from "../../utils/ApiCall";
import { useForm } from "react-hook-form";
import PhoneLoginModal from "./PhoneLoginModal";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [{ user }, dispatch] = useStateValue();

  const onSubmit = async (data) => {
    const { userName: username, password } = data;

    try {
      const response = await LoginAPi(username, password);
console.log("inside login",response)
      if (response.status === 401) {
        alert(response.message);
        return;
      }
      if (!user) {
        dispatch({
          type: actionType.SET_USER,
          user: response.data,
        });

        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        alert("You are already logged in");
        return;
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    const message = error.response.data;
    alert(message);
    console.log("handel error")
  };

  return (
    <div className="login_container">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userName">Email</label>
          <input
            type="email"
            name="userName"
            id="userName"
            placeholder="someone@xyz.com"
            {...register("userName", { required: true })}
          />
          {errors.userName && <span>Email is required</span>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="+++++++++++"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password is required</span>}
          <button type="submit" name="submit">
            Submit
          </button>
        </form>
        <div id="continue_with_google">
  <GoogleButton />
  <span>Or</span>
  <PhoneLoginModal />
</div>
      </div>
    </div>
  );
};

export default Login;

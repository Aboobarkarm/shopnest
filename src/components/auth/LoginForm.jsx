"use client";

import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { CgNametag } from "react-icons/cg";
import { BiLock } from "react-icons/bi";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import axios from "axios";
import SocialLogin from "../auth/SocialLogin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ImSpinner } from "react-icons/im";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (register) {
      try {
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        setLoading(true);

        const response = await axios.post(`/api/register`, {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          toast.success("User Created");
          setRegister(false);
          setName("");
          setEmail("");
          setConfirmPassword("");
          setPassword("");
        } else if (response.status === 409) {
          toast.error("User already exists");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/api/login", { email, password });
        if (response.status === 201) {
          toast.success(response.data.message);
          router.push("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Login failed");
      } finally {
        setLoading(false);
      }
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  return (
    <div className="flex flex-col gap-2 h-screen items-center pt-5 rounded-md">
      <h2 className="my-font font-semibold tracking-wider">
        SHOP<span className="text-green-700">NEST</span>
      </h2>
      <form
        className="p-5 flex flex-col w-full  md:w-[50%] items-center justify-center gap-4"
        /* onSubmit={handleSubmit} */
      >
        <h1 className="text-2xl font-semibold my-font text-green-800">
          {register ? "Register" : "Login"}
        </h1>

        <div className="md:w-[80%] w-[90%] bg-gray-100 rounded-md p-2 gap-2 flex items-center ">
          <MdEmail className="text-2xl text-green-600" />
          <input
            type="email"
            name="email"
            className="h-full w-full bg-transparent  outline-none p-2 text-[15px]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {register && (
          <div className="md:w-[80%] w-[90%] bg-gray-100 rounded-md p-2 gap-2 flex items-center ">
            <CgNametag className="text-2xl text-green-600" />
            <input
              type="text"
              name="name"
              className="h-full w-full bg-transparent  outline-none p-2 text-[15px]"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )};

        <div className="md:w-[80%] w-[90%] bg-gray-100 rounded-md p-2 gap-2 flex items-center ">
          <BiLock className="text-2xl text-green-600" />
          <input
            type="password"
            className="h-full w-full bg-transparent  outline-none p-2 text-[15px]"
            placeholder="Password"
            value={password}
            id="password"
            onChange={handlePasswordChange}
          />
        </div>

        {register && (
          <div className="md:w-[80%] w-[90%] bg-gray-100 rounded-md p-2 gap-2 flex items-center ">
            <BiLock className="text-2xl text-green-600" />
            <input
              type="password"
              className="h-full w-full bg-transparent outline-none p-2 text-[15px]"
              placeholder="Confirm Password"
              id="confirmPassword"
              value={confirmPassword}
              name="password"
              onChange={handleConfirmPasswordChange}
            />
          </div>
        )}

        {!register && (
          <div className="flex items-center justify-between md:w-[80%] w-[90%]">
            <p className="text-sm text-blue-600 cursor-pointer">
              Forgot Password?
            </p>
            <FormControlLabel
              label="Remember me"
              control={<Checkbox color="success" />}
              labelPlacement="start"
            />
          </div>
        )}

        <div className="md:w-[80%] w-[90%] flex justify-center items-center">
          {loading ? (
            <ImSpinner className="animate-spin text-3xl text-green-600" />
          ) : (
            <button
              type="submit"
              className="px-4 py-2 mb-2 bg-green-600 text-white rounded-md hover:bg-inherit hover:text-green-600 transition ease-in-out duration-500"
            >
              {register ? "Register" : "Login"}
            </button>
          )}
        </div>

        {passwordMatchError && <p className="text-red-600">{passwordMatchError}</p>}

        <p className="text-[15px] text-black">
          {register ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setRegister(!register)}
            className="text-blue-800 cursor-pointer"
          >
            {register ? "Login" : "Signup"}
          </span>
        </p>
      </form>

      <div className="md:w-[80%] w-[90%] border-t-2 border-gray-200 flex items-center justify-center flex-col gap-2">
        <p className="text-gray-500 text-[15px]">Or</p>
         <SocialLogin register={register} /> 
      </div>
    </div>
  );
};

export default LoginForm;

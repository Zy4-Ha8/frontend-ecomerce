import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, OTPSending, registerUser } from "../../features/auth/auth";
import { useNavigate } from "react-router-dom";
import AuthTable from "../../components/AuthTable";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await dispatch(loginUser(formData)).unwrap();
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };
  const inputsContent = [
    {
      name: "username",
      type: "text",
      placeholder: "add the username",
    },
    {
      name: "password",
      type: "password",
      placeholder: "add your password",
    },
  ];
  const inputsMap = inputsContent.map((input, index) => (
    <input
      key={index}
      className="py-4 px-5 bg-blue-100 rounded-xl text-xl w-2xl outline-none"
      type={input.type}
      name={input.name}
      onChange={handleInputChange}
      placeholder={input.placeholder}
    />
  ));
  return (
    <div className="flex flex-col bg-white h-screen overflow-hidden">
      <AuthTable
        header={"Welcome back!"}
        inputsContent={inputsContent}
        handleInputChange={handleInputChange}
        handleSumit={handleSumit}
        submitButton={"login"}
        routeLink={"registion"}
      />
    </div>
  );
}

export default Login;

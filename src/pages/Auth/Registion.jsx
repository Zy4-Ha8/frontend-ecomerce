import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OTPSending, registerUser } from "../../features/auth/auth";
import { useNavigate } from "react-router-dom";
import AuthTable from "../../components/AuthTable";

function Registion() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
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
      const data = await dispatch(registerUser(formData)).unwrap();
      const id = data.user.id;
      await dispatch(OTPSending({ id: id })).unwrap();
      navigate(`/otp-verify/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const inputsContent = [
    {
      name: "name",
      type: "text",
      placeholder: "add the name",
    },
    {
      name: "username",
      type: "text",
      placeholder: "add the username",
    },
    {
      name: "email",
      type: "email",
      placeholder: "add you email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "add your password",
    },
    {
      name: "confire-password",
      type: "password",
      placeholder: "confire you password",
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
    <div className="flex flex-col   h-screen overflow-hidden">
    <AuthTable
        header={"Welcome back!"}
        inputsContent={inputsContent}
        handleInputChange={handleInputChange}
        handleSumit={handleSumit}
        submitButton={"Registion"}
        routeLink={"login"}
      />
     
    </div>
  );
}

export default Registion;

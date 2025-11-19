import React, { useState } from "react";
import DashboardForm from "../../../components/DashboardForm";

function AddUser() {
  const [formdata, setFormdata] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    userAvatar: {},
    password: "",
  });

  const inputsContent = [
    {
      name: "name",
      type: "text",
      placeholder: "add the name of the user",
    },
    {
      name: "username",
      type: "text",
      placeholder: "add the username",
    },
    {
      name: "email",
      type: "email",
      placeholder: "add the email of the user",
    },
    {
      name: "role",
      type: "text",
      placeholder: "add the role of the user",
    },
    {
      name: "avatar",
      type: "file",
      placeholder: "add the image of the user",
    },
    {
      name: "password",
      type: "password",
      placeholder: "add your password",
    },
  ];
  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formdata);
  };
  return (
    <div>
      <DashboardForm
        headerText={"add new user"}
        inputsCotent={inputsContent}
        handleInputChange={handleInputChange}
        submitButton={"Add New User"}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddUser;

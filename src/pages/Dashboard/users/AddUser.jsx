import React, { useState } from "react";
import DashboardForm from "../../../components/DashboardForm";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../features/users/usersSlice";

function AddUser() {
  const [formdata, setFormdata] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    userAvatar: {},
    password: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const users = useSelector((state) => state.users);
  const errorMessage = users?.error?.message;
  console.log(users);
  const dispatch = useDispatch();
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormdata({ ...formdata, userAvatar: file });
    }
  };
  console.log(formdata);
  const imageRemove = () => {
    setImagePreview(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formdata));
  };
  return (
    <div>
      <DashboardForm
        headerText={"add new user"}
        inputsCotent={inputsContent}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        imageRemove={imageRemove}
        submitButton={"Add New User"}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default AddUser;

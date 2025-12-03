import React, { useRef, useState } from "react";
import DashboardForm from "../../../components/DashboardForm";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../features/users/usersSlice";
import avatarFake from "../../../assets/images/avatarFake.png";
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
  const firstInput = useRef(null);
  const [successStatus, setSuccessStatus] = useState(false);
  const inputsContent = [
    {
      name: "name",
      type: "text",
      placeholder: "add the name of the user",
      ref: firstInput,
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
      type: "options",
      options: [
        { text: "select the role of the user", value: "" },
        { text: "customer", value: "customer" },
        { text: "admin", value: "admin" },
        { text: "manager", value: "manager" },
      ],
    },
    {
      name: "password",
      type: "password",
      placeholder: "add your password",
    },
    {
      name: "avatar",
      type: "file",
      placeholder: "add the image of the user",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createUser(formdata)).unwrap();
      if (result) {
        setFormdata({
          name: "",
          username: "",
          email: "",
          role: "",
          userAvatar: {},
          password: "",
        });
        setImagePreview(null);
        firstInput.current.focus();
        setSuccessStatus(true);
        setTimeout(() => {
          setSuccessStatus(false);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(formdata);
  return (
    <div>
      <DashboardForm
        headerText={"add new user"}
        inputsCotent={inputsContent}
        handleInputChange={handleInputChange}
        formdata={formdata}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        imageRemove={imageRemove}
        submitButton={"Add New User"}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        successStatusStuff={{ successStatus, setSuccessStatus }}
        blank_Image={avatarFake}
        loadingState={users.loading}
      />
    </div>
  );
}

export default AddUser;

import React, { useEffect, useRef, useState } from "react";
import DashboardForm from "../../../components/DashboardForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../features/users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { username } = useParams();

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        await dispatch(getUserById(username))
          .unwrap()
          .then((data) => {
            setFormdata(data);
            setImagePreview(data.userAvatar.url);
          });
      }
    };
    fetchUser();
  }, []);
  const [formdata, setFormdata] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    userAvatar: {},
  });
  const [imagePreview, setImagePreview] = useState(null);
  const errorMessage = users?.error?.message;
  console.log(errorMessage)
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
      options: ["customer", "admin", "manager"],
    },
    {
      name: "avatar",
      type: "file",
      placeholder: "add the image of the user",
    },
  ];
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  // TODO backend api not complete for this
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImagePreview(URL.createObjectURL(file));
  //     setFormdata({ ...formdata, userAvatar: file });
  //   }
  // };
  // TODO backend api not complete for this
  // const imageRemove = () => {
  //   setImagePreview(null);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {};

      if (formdata.name !== users.currentUser.name) {
        updateData.name = formdata.name;
      }
      if (formdata.username !== users.currentUser.username) {
        updateData.username = formdata.username;
      }
      if (formdata.email !== users.currentUser.email) {
        updateData.email = formdata.email;
      }
      if (formdata.role !== users.currentUser.role) {
        updateData.role = formdata.role;
      }

      const result = await dispatch(
        updateUser({ userId: users.currentUser.id, userData: updateData })
      ).unwrap();
      if (result) {
        navigate("/dashboard/show-users");
        setFormdata({
          name: "",
          username: "",
          email: "",
          role: "",
          userAvatar: {},
          password: "",
        });
        setImagePreview(null);
      }
    } catch (err) {
      console.log(err)
      // navigate("/dashboard/show-users");
    }
  };

  return (
    <div>
      <DashboardForm
        headerText={"update the user"}
        
        inputsCotent={inputsContent}
        handleInputChange={handleInputChange}
        formdata={formdata}
        imagePreview={imagePreview}
        // TODO backend api not complete for this
        // handleImageChange={handleImageChange}
        // imageRemove={imageRemove}
        submitButton={"Update The User"}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        successStatusStuff={{ successStatus, setSuccessStatus }}
        loadingState={users.loading}
      />
    </div>
  );
}

export default UpdateUser;

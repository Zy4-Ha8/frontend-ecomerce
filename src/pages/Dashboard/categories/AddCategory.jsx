import React, { useRef, useState } from "react";
import DashboardForm from "../../../components/DashboardForm";
import { useDispatch, useSelector } from "react-redux";
import blank_Image from "../../../assets/images/blankImage.jpg";
import { createCategory } from "../../../features/categories/categoriesSlice";
function AddUser() {
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    image_url: {},
    is_active: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const categories = useSelector((state) => state.categories);
  const errorMessage = categories?.error?.message;
  console.log(categories);
  const dispatch = useDispatch();
  const firstInput = useRef(null);
  const [successStatus, setSuccessStatus] = useState(false);
  const inputsContent = [
    {
      name: "name",
      type: "text",
      placeholder: "add the name of the category",
      ref: firstInput,
    },
    {
      name: "description",
      type: "text",
      placeholder: "add the description",
    },

    {
      name: "is_active",
      type: "options",
      options: [
        { text: "select the state of the category", value: "" },
        { text: "active", value: true },
        { text: "inactive", value: false },
      ],
    },

    {
      name: "category image",
      type: "file",
      placeholder: "add the image of the category",
    },
  ];

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormdata({ ...formdata, image_url: file });
    }
  };
  console.log(formdata);
  const imageRemove = () => {
    setImagePreview(null);
    setFormdata({ ...formdata, image_url: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createCategory(formdata)).unwrap();
      if (result) {
        setFormdata({
          name: "",
          description: "",
          image_url: {},
          is_active: null,
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
        headerText={"add new category"}
        inputsCotent={inputsContent}
        handleInputChange={handleInputChange}
        formdata={formdata}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        imageRemove={imageRemove}
        submitButton={"Add New Category"}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        successStatusStuff={{ successStatus, setSuccessStatus }}
        blank_Image={blank_Image}
        loadingState={categories.loading}
      />
    </div>
  );
}

export default AddUser;

import React, { useEffect, useRef, useState } from "react";
import DashboardForm from "../../../components/DashboardForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../features/users/usersSlice";
import { useNavigate, useParams } from "react-router-dom";
import BlankImage from "../../../assets/images/blankImage.jpg";
import {
  getCategoryById,
  updateCategory,
} from "../../../features/categories/categoriesSlice";

function UpdateCategory() {
  const { id } = useParams();

  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = async () => {
      if (id) {
        await dispatch(getCategoryById(id))
          .unwrap()
          .then((data) => {
            setFormdata(data);
            setImagePreview(data.image_url.url);
          });
      }
    };
    fetchCategories();
  }, []);
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    is_active: "",
    image_url: {},
  });
  const [imagePreview, setImagePreview] = useState(null);
  const errorMessage = categories?.error?.message;
  console.log(errorMessage);
  const firstInput = useRef(null);
  const [successStatus, setSuccessStatus] = useState(false);
  const inputsContent = [
    {
      name: "name",
      type: "text",
      placeholder: "update the name of the category",
      ref: firstInput,
    },
    {
      name: "description",
      type: "text",
      placeholder: "add the username",
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
      name: "image_url",
      type: "file",
      placeholder: "update the image of the category",
    },
  ];
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  // TODO backend api not complete for this
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormdata({ ...formdata, image_url: file });
    }
  };
  // TODO backend api not complete for this
  const imageRemove = () => {
    setImagePreview(null);
    setFormdata({ ...formdata, image_url: null });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {};

      if (formdata.name !== categories.currentCategory.name) {
        updateData.name = formdata.name;
      }
      if (formdata.description !== categories.currentCategory.description) {
        updateData.description = formdata.description;
      }
      if (formdata.is_active !== categories.currentCategory.is_active) {
        updateData.is_active = formdata.is_active;
      }
      if (formdata.image_url !== null) {
        updateData.image_url = formdata.image_url;
      }

      const result = await dispatch(
        updateCategory({ categoryId: id, updateCategory: updateData })
      ).unwrap();
      if (result) {
        navigate("/dashboard/show-categories");
      }
    } catch (err) {
      console.log(err);
      // navigate("/dashboard/show-users");
    }
  };
  console.log(formdata);
  return (
    <div>
      <DashboardForm
        headerText={"update the category"}
        inputsCotent={inputsContent}
        handleInputChange={handleInputChange}
        formdata={formdata}
        imagePreview={imagePreview}
        handleImageChange={handleImageChange}
        imageRemove={imageRemove}
        submitButton={"Update The Category"}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        successStatusStuff={{ successStatus, setSuccessStatus }}
        loadingState={categories.loading}
        updateLoading={categories.updateLoading}
        blank_Image={BlankImage}
      />
    </div>
  );
}

export default UpdateCategory;

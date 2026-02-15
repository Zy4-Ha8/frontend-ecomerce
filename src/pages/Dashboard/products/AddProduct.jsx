import React, { useRef, useState } from "react";
import DashboardForm from "../../../components/DashboardForm";
import { useDispatch, useSelector } from "react-redux";
import blank_Image from "../../../assets/images/blankImage.jpg";
import { createCategory } from "../../../features/categories/categoriesSlice";
function AddProduct() {
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    category_id: "",
    brand: "",
    gender: "",
    season: [],
    styleTags: [],
    sizes: [],
    colors: [],
    price: 0,
    discountPrice: 0,
    stock: 0,
    isAvailable: false,
    isBestSeller: false,
    isNewArrival: false,
    isFeatured: false,
    thumbnail: {},
    images: [],
  });
  const [seasonState, setSeasonState] = useState([]);
  const seasonOptions = [
    { value: "summer", label: "Summer" },
    { value: "winter", label: "Winter" },
    { value: "autumn", label: "Autumn" },
    { value: "spring", label: "Spring" },
  ];
  const [styleTagsState, setStyleTagsState] = useState([]);
  const styleTagsOptions = [
    { value: "classic", label: "Classic" },
    { value: "casual", label: "Casual" },
    { value: "bohemian", label: "Bohemian" },
    { value: "streetwear", label: "Streetwear" },
    { value: "minimalist", label: "Minimalist" },
    { value: "preppy", label: "Preppy" },
    { value: "glamorous", label: "Glamorous" },
    { value: "edgy", label: "Edgy" },
    { value: "romantic", label: "Romantic" },
    { value: "professional", label: "Professional" },
  ];
  const [sizeState, setSizeState] = useState([]);
  const sizeOptions = [
    { value: "S", label: "Small" },
    { value: "M", label: "Midium" },
    { value: "L", label: "Large" },
    { value: "XL", label: "extra large" },
    { value: "XX", label: "2 extra large" },
    { value: "XXX", label: "3 extra large" },
  ];
  const [colorState, setColorState] = useState([]);
  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "purple", label: "Purple" },
    { value: "pink", label: "Pink" },
  ];
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
      name: "brand",
      type: "text",
      placeholder: "add the brand name",
    },

    {
      name: "gender",
      type: "options",
      options: [
        { text: "select the gender for the product", value: "" },
        { text: "male", value: "male" },
        { text: "female", value: "female" },
        { text: "not answer", value: "not answer" },
      ],
    },
    {
      name: "seasons",
      type: "multiSelect",
      options: seasonOptions,
      state: seasonState,
      setState: setSeasonState,
    },
    {
      name: "styleTags",
      type: "multiSelect",
      options: styleTagsOptions,
      state: styleTagsState,
      setState: setStyleTagsState,
    },
    {
      name: "sizes",
      type: "multiSelect",
      options: sizeOptions,
      state: sizeState,
      setState: setSizeState,
    },
    {
      name: "colors",
      type: "multiSelect",
      options: colorOptions,
      state: colorState,
      setState: setColorState,
    },
    {
      name: "price",
      type: "number",
      placeholder: "add the price of the product",
    },
    {
      name: "discountPrice",
      type: "number",
      placeholder: "add the discountPrice of the product",
    },
    {
      name: "stock",
      type: "number",
      placeholder: "add the stock of the product",
    },
    {
      name: "isAvailable",
      type: "checkbox",
    },
    {
      name: "isBestSeller",
      type: "checkbox",
    },
    {
      name: "isNewArrival",
      type: "checkbox",
    },
    {
      name: "isFeatured",
      type: "checkbox",
    },
    {
      name: "thumbnail",
      type: "file",
      placeholder: "add the image of the product",
    },
    {
      name: "images",
      type: "files",
      placeholder: "add the images of the product",
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
        headerText={"add new Product"}
        inputsCotent={inputsContent}
        handleInputChange={handleInputChange}
        formdata={formdata}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        imageRemove={imageRemove}
        submitButton={"Add New Product"}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        successStatusStuff={{ successStatus, setSuccessStatus }}
        blank_Image={blank_Image}
        loadingState={categories.loading}
      />
      
    </div>
  );
}

export default AddProduct;

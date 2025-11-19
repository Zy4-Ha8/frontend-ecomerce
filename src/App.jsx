import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import OTPVerification from "./pages/Auth/OTPVerification";
import Registion from "./pages/Auth/Registion";
import HomePage from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Dashboard/users/Users";
import AddUser from "./pages/Dashboard/users/AddUser";
import AddCategory from "./pages/Dashboard/categories/AddCategory";
import Products from "./pages/Dashboard/products/Products";
import AddProduct from "./pages/Dashboard/products/AddProduct";
import Categories from "./pages/Dashboard/categories/Categories";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registion" element={<Registion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verify/:id" element={<OTPVerification />} />
          <Route path="/profile/" element={<Profile />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-user" element={<AddUser />} />
            <Route path="show-users" element={<Users />} />

            <Route path="add-category" element={<AddCategory />} />
            <Route path="show-catgeories" element={<Categories />} />

            <Route path="add-product" element={<AddProduct />} />
            <Route path="show-products" element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

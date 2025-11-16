import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const Profile = () => {
  const cookie = new Cookies();
  const accessToken = cookie.get("access_token");
  useEffect(() => {
    if (accessToken) {
      axios
        .get("https://ecomerce-production-d4d4.up.railway.app/users/profile", {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((res) => console.log(res));
    }
  }, []);
  return <>haider ali </>;
};

export default Profile;

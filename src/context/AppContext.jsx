import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);

  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const loadCreditData = async () => {
    try {
      const response = await axios.get(backendurl + "/api/user/credits", {
        headers: { token },
      });
      //   const {data} = await axios.get(backendurl + "/api/user/credits", {
      //     headers: { token },
      //   });
      const data = response.data;
      //   console.log("this is credit data", response);
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const response = await axios.post(
        backendurl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );
      console.log("this is generateimage", response);
      const data = response.data;
      if (data.success) {
        loadCreditData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditData();
        if (data.creditBalance === 0) {
          navigate("/buycredit");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };
  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendurl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
      {/* {children} */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const {
        token,
        email: userEmail,
        firstName,
        lastName,
        role,
        id,
      } = response.data;

      //store user and token
      const userData = {
        token,
        email: userEmail,
        firstName,
        lastName,
        role,
        id,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      //set axios default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Invalid email or password";
      throw new Error(errorMsg);
    }
  };

  const register = async (email, password, firstName, lastName, role) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      const {
        token,
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName,
        role: userRole,
        userId,
      } = response.data;

      //store user and token
      const userData = {
        token,
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName,
        role: userRole,
        userId,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      //set axios default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
      throw new Error(errorMsg);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

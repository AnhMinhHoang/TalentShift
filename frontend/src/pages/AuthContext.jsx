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
        fullName,
        role,
        id,
      } = response.data;

      //store user and token
      const userData = {
        token,
        email: userEmail,
        fullName,
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

  const register = async (email, password, role) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        fullName: "", // Empty fullName since it will be set in RegisterAdditional
        email,
        password,
        role,
      });

      const {
        token,
        userId,
        fullName: userFullName,
        email: userEmail,
        role: userRole,
      } = response.data;

      // Store user data and token
      const userData = {
        token,
        email: userEmail,
        fullName: userFullName,
        role: userRole,
        id: userId,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userId", userId);

      // Set axios default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Registration failed";
      throw new Error(errorMsg);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

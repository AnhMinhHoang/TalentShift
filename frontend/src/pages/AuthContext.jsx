import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      axios.get("http://localhost:8080/auth/checkUser")
        .then((res) => setUserData(res.data))
        .catch(() => {
          setUser(null);
          setUserData(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userId");
          delete axios.defaults.headers.common["Authorization"];
        })
        .finally(() => setLoading(false)); // ✅ loading complete
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      (async () => {
        try {
          await getUserById(user.id);
        } catch (e) {
          console.error(e);
        }
      })();
    } else {
      setUserData(null); // Clear old data if user is null
    }
  }, [user]);

  const login = async (email, password, google = false) => {
    try {
      let response;
      if (google) {
        // Google login: fetch user by email
        response = await axios.post("http://localhost:8080/auth/google-login", { email });
      } else {
        response = await axios.post("http://localhost:8080/auth/login", {
          email,
          password,
        });
      }
      const {
        token,
        email: userEmail,
        fullName,
        role,
        id,
      } = response.data;

      //store user and token
      const userInfo = {
        token,
        email: userEmail,
        fullName,
        role,
        id,
      };
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("token", token);

      //set axios default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await getUserById(userInfo.id);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Invalid email or password";
      throw new Error(errorMsg);
    }
  };

  const register = async (email, password, role, fullName) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        fullName, // Empty fullName since it will be set in RegisterAdditional
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

      // Set axios default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await getUserById(userId);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Registration failed";
      throw new Error(errorMsg);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setUserData(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw new Error("Failed to fetch user data");
    }
  };

  const logout = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserById, userData, setUserData, loading }}>
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
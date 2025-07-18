import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      api.get("/auth/checkUser")
        .then((res) => setUserData(res.data))
        .catch(() => {
          setUser(null);
          setUserData(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userId");
        })
        .finally(() => setLoading(false));
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
      setUserData(null);
    }
  }, [user]);

  const login = async (email, password, google = false) => {
    // Hardcoded admin login
    if (email === 'adminTS@gmail.com' && password === '@adminTS5624@') {
      const adminUser = {
        token: 'admin-token',
        email: 'adminTS@gmail.com',
        fullName: 'Admin',
        role: 'ADMIN',
        id: 0,
      };
      setUser(adminUser);
      setUserData(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('token', 'admin-token');
      return;
    }
    try {
      let response;
      if (google) {
        response = await api.post("/auth/google-login", { email });
      } else {
        response = await api.post("/auth/login", {
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

      await getUserById(userInfo.id);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Invalid email or password";
      throw new Error(errorMsg);
    }
  };

  const register = async (email, password, role, fullName) => {
    try {
      const response = await api.post("/auth/register", {
        fullName,
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

      await getUserById(userId);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Registration failed";
      throw new Error(errorMsg);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUserData(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw new Error("Failed to fetch user data");
    }
  };

  const logout = () => {
    setLoading(true);
    try {
      navigate("/login");
      setTimeout(() => {
        setUser(null);
        setUserData(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        setLoading(false);
      }, 100); // small delay allows navigation to complete
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserById, userData, setUserData, loading, setLoading }}>
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
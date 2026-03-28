import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

import Login from "./components/Login";
import Register from "./pages/Register";

import Layout from "./components/Layout";
import StudentManagement from "./pages/StudentManagement";
import EmployeeManagement from "./pages/EmployeeManagement";

import "./App.css";

function App() {
  const { user } = useAuth();

  const [tab, setTab] = useState("login");
  const [page, setPage] = useState("students");

  if (!user) {
    return (
      <div className="auth-container">
        <div className="tabs">
          <button
            className={tab === "login" ? "active" : ""}
            onClick={() => setTab("login")}
          >
            Đăng nhập
          </button>

          <button
            className={tab === "register" ? "active" : ""}
            onClick={() => setTab("register")}
          >
            Đăng ký
          </button>
        </div>

        <div
          className={`form-wrapper ${
            tab === "register" ? "slide-register" : ""
          }`}
        >
          <div className="form-slide">
            <Login />
          </div>

          <div className="form-slide">
            <Register />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout page={page} setPage={setPage}>
      {page === "students" && <StudentManagement />}

      {page === "employees" && user?.role === "admin" && <EmployeeManagement />}
    </Layout>
  );
}

export default App;

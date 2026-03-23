import { useState, useEffect } from "react";
import { getUser } from "./utils/auth";

import Login from "./components/Login";
import Register from "./pages/Register";

import Layout from "./components/Layout";
import StudentManagement from "./pages/StudentManagement";
import EmployeeManagement from "./pages/EmployeeManagement";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("login");
  const [page, setPage] = useState("students");

  useEffect(() => {
    const u = getUser();
    if (u) setUser(u);
  }, []);

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
            <Login setUser={setUser} />
          </div>

          <div className="form-slide">
            <Register />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout user={user} page={page} setPage={setPage} setUser={setUser}>
      {page === "students" && <StudentManagement />}

      {page === "employees" && user?.role === "admin" && <EmployeeManagement />}
    </Layout>
  );
}

export default App;

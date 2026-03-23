import { useState } from "react";
import { api } from "../services/api";
import Control from "./Control";
import "../styles/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "employee",
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    const users = await api.get(`/users?email=${form.email}`);

    if (users.length > 0) {
      alert("Email đã tồn tại");
      return;
    }

    await api.post("/users", form);
    alert("Đăng ký thành công");
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>

      <Control
        label="Username"
        name="username"
        required
        minLength={3}
        value={form.username}
        onChange={handleChange}
      />

      <Control
        label="Email"
        name="email"
        type="email"
        required
        value={form.email}
        onChange={handleChange}
      />

      <Control
        label="Password"
        name="password"
        type="password"
        required
        minLength={6}
        value={form.password}
        onChange={handleChange}
      />

      <Control
        label="Role"
        name="role"
        type="select"
        value={form.role}
        onChange={handleChange}
        options={[
          { label: "Employee", value: "employee" },
          { label: "Admin", value: "admin" },
        ]}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

  import { useState } from "react";
  import { api } from "../services/api";
  import { login } from "../utils/auth";
  import Control from "../pages/Control";
  import "../styles/Login.css";

  export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
      setError(null);
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
      if (!form.email || !form.password) {
        setError("Vui lòng điền đầy đủ thông tin");
        return;
      }

      setLoading(true);
      try {
        const users = await api.get("/users");
        const email = form.email.trim().toLowerCase();
        const password = form.password.trim();

        const user = users.find(
          (u) =>
            u.email?.trim().toLowerCase() === email &&
            u.password?.trim() === password,
        );

        if (user) {
          login(user);
          window.location.reload();
        } else {
          setError("Sai email hoặc mật khẩu!");
        }
      } catch (err) {
        setError("Lỗi kết nối server");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="auth-form">
        <h2>Login</h2>
        <div className={`control-group ${error ? "error" : ""}`}>
          <Control
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={`control-group ${error ? "error" : ""}`}>
          <Control
            label="Password"
            name="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    );
  }

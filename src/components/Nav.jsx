import { useAuth } from "../contexts/AuthContext";
import "../styles/Nav.css";

export default function Nav({ setPage }) {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <aside className="sidebar">
      <button onClick={() => setPage("students")}>Quản lý sinh viên</button>
      {user?.role === "admin" && (
        <button onClick={() => setPage("employees")}>Quản lý nhân viên</button>
      )}
      <div className="logout">
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    </aside>
  );
}

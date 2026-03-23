import "../styles/Nav.css";
import { logout } from "../utils/auth";

export default function Nav({ user, setPage, setUser }) {
  const handleLogout = () => {
    logout();
    setUser(null);
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

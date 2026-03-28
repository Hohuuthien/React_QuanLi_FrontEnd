import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/Header.css";

const DEFAULT_AVATAR = "/images/user.png";

const ROLE_AVATAR = {
  admin: "/images/administrator.png",
  employee: "/images/boy.png",
  user: "/images/user.png",
};

export default function Header() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const avatarSrc =
    user?.avatar || ROLE_AVATAR[user?.role?.toLowerCase?.()] || DEFAULT_AVATAR;

  const username = user?.username || "Guest";

  return (
    <header className="header">
      <h2>Hệ thống quản lý</h2>

      <div className="user-info">
        <button
          onClick={toggleTheme}
          className="theme-btn"
          aria-label="Toggle theme"
        >
          <img
            src={theme === "light" ? "/images/moon.png" : "/images/sun.png"}
            alt="theme icon"
            className="theme-icon"
          />
        </button>

        <img
          src={avatarSrc}
          alt="User avatar"
          className="avatar"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR;
          }}
        />

        <span>Xin chào: {username}</span>
      </div>
    </header>
  );
}

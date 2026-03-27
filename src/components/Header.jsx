import "../styles/Header.css";

const DEFAULT_AVATAR = "/images/user.png";
const ADMIN_AVATAR = "/images/administrator.png";
const EMPLOYEE_AVATAR = "/images/boy.png";
const USER_AVATAR = "/images/user.png";

const ROLE_AVATAR = {
  admin: ADMIN_AVATAR,
  employee: EMPLOYEE_AVATAR,
  user: USER_AVATAR,
};

export default function Header({ user }) {
  const avatar = user?.avatar || ROLE_AVATAR[user?.role] || DEFAULT_AVATAR;

  return (
    <header className="header">
      <h2>Hệ thống quản lý</h2>

      <div className="user-info">
        <img
          src={avatar}
          alt="avatar"
          className="avatar"
          onError={(e) => (e.target.src = DEFAULT_AVATAR)}
        />
        <span>Xin chào: {user?.username}</span>
      </div>
    </header>
  );
}

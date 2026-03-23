import "../styles/Header.css";

export default function Header({ user }) {
  return (
    <>
      <header className="header">
        <h2>Hệ thống quản lý</h2>
        <div>Xin chào: {user?.username}</div>
      </header>
    </>
  );
}

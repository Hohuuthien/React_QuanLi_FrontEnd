import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout({ user, setPage, setUser, children }) {
  return (
    <div className="layout">
      <Nav user={user} setPage={setPage} setUser={setUser} />

      <div className="main-wrapper">
        <Header user={user} />
        <main className="content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout({ setPage, children }) {
  return (
    <div className="layout">
      <Nav setPage={setPage} />

      <div className="main-wrapper">
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

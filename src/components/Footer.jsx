import "../styles/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        © {currentYear} — <span>Hệ thống Quản lý Sinh viên</span>
      </div>
      <div className="footer-right" style={{ opacity: 0.7 }}>
        Phiên bản 1.0.0
      </div>
    </footer>
  );
}
